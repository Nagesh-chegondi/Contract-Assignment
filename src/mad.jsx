import { useState } from 'react';
import contracts from '../public/contracts.json';
let currentRows;
 
export function Dashboard() {
  console.log('hi');
  const [toggle, settoggle] = useState(false);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Topbar />
      <div className="flex flex-1">
        <Sidebar settoggle={settoggle} toggle={toggle} />
        {toggle ? <Mainbar /> : null}
      </div>
    </div>
  );
}

function Sidebar({ settoggle, toggle }) {
  return (
    <div className="bg-gray-800 text-white w-64 p-4 space-y-2 font-sans flex flex-col h-[calc(100vh-80px)]">
      <h4 onClick={() => settoggle(!toggle)} className="p-3 rounded-md cursor-pointer hover:bg-gray-700 transition-colors duration-200">
        Contracts
      </h4>
      <h4 className="p-3 rounded-md cursor-pointer hover:bg-gray-700 transition-colors duration-200">
        Insights
      </h4>
      <h4 className="p-3 rounded-md cursor-pointer hover:bg-gray-700 transition-colors duration-200">
        Reports
      </h4>
      <h4 className="p-3 rounded-md cursor-pointer hover:bg-gray-700 transition-colors duration-200">
        Settings
      </h4>
    </div>
  );
}

function Topbar() {
  return (
    <div className="bg-slate-900 text-white h-20 shadow-md flex items-center p-4">
      <h1 className="text-2xl font-bold">My Dashboard</h1>
    </div>
  );
}

function Mainbar() {
  const [filterValue, setFilterValue] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Filter the data based on the selected value
  const filteredData = contracts[0].filter(item => {
    if (filterValue === 'all') {
      return true;
    }
    // Assumes your contract object has 'status' and 'risk' properties
    return item.status === filterValue || item.risk === filterValue;
  });

  // Calculate pagination details based on the filtered data
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = filteredData.slice(startIndex, endIndex);

  // Handle changes for both dropdowns
  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
    // Reset to the first page whenever the filter changes
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  return (
    <div className="flex-1 p-8 bg-white rounded-lg shadow-lg m-4 overflow-hidden">
      <div className="mb-6 flex justify-between items-center">
        <input
           onChange={handleFilterChange} value={filterValue}className="w-1/3 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          type="text"
          placeholder="Search contracts..."
        />
        <div className="flex space-x-2">
          <select id="statusFilter" onChange={handleFilterChange} value={filterValue}>
            <option value="all">Status: All</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Renewal Due">Renewal Due</option>
          </select>
          <select id="riskFilter" onChange={handleFilterChange} value={filterValue}>
            <option value="all">Risk: All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-left">Contract Name</th>
            <th className="py-3 px-6 text-left">Parties</th>
            <th className="py-3 px-6 text-left">Expiry Date</th>
            <th className="py-3 px-6 text-left">Status</th>
            <th className="py-3 px-6 text-left">Risk Score</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {currentRows.map((chat, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200">
              <td className="py-3 px-6 text-left">{chat.name}</td>
              <td className="py-3 px-6 text-left">{chat.parties}</td>
              <td className="py-3 px-6 text-left">{chat.expiry}</td>
              <td className="py-3 px-6 text-left">
                <span className={`py-1 px-3 rounded-full text-xs font-semibold
                  ${chat.status === 'Active' ? 'bg-green-200 text-green-600' :
                    chat.status === 'Expired' ? 'bg-red-200 text-red-600' :
                    'bg-yellow-200 text-yellow-600'}`}>
                  {chat.status}
                </span>
              </td>
              <td className="py-3 px-6 text-left">
                <span className={`py-1 px-3 rounded-full text-xs font-semibold
                  ${chat.risk === 'High' ? 'bg-red-200 text-red-600' :
                    chat.risk === 'Medium' ? 'bg-yellow-200 text-yellow-600' :
                    'bg-green-200 text-green-600'}`}>
                  {chat.risk}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors duration-200"
        >
          <span>Previous</span>
        </button>
        <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors duration-200"
        >
          <span>Next</span>
        </button>
      </div>
    </div>
  );
}

export default Mainbar;