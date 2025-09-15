import { useState, useEffect, useRef } from 'react';
import contracts from '../public/contracts.json';


export function Dashboard() {
  const [toggle, setToggle] = useState(false);
  const[hidden, sethidden]  = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Topbar setToggle={setToggle} />
      <div className="flex flex-1">
        <Sidebar setToggle={setToggle} toggle={toggle} hidden={hidden} sethidden={sethidden} />
        { hidden?<Mainbar />}:null}
      </div>
    </div>
  );
}


function Sidebar({ setToggle, toggle,hidden,sethidden }) {
  return (
    <div className={`
      fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out
      bg-gray-800 text-white w-64 p-4 space-y-2 font-sans flex flex-col h-full z-40
      ${toggle ? 'translate-x-0' : '-translate-x-full'}
      md:relative md:translate-x-0 md:h-[calc(100vh-80px)]
      overflow-y-auto
    `}>
      <div className="flex justify-end md:hidden">
        <button onClick={() => setToggle(false)} className="text-white text-2xl">
          &times;
        </button>
      </div>
      <h4 onClick={()=>{sethidden(!hidden)} className="p-3 rounded-md cursor-pointer hover:bg-gray-700 transition-colors duration-200">
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


function Topbar({ setToggle }) {
  
  const [userProfile, setUserProfile] = useState({
    name: 'John Doe',
    imageUrl: 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png' 
  });

  return (
    <div className="bg-slate-900 text-white h-20 shadow-md flex items-center justify-between p-4 z-50">
      <div className="flex items-center">
        <button onClick={() => setToggle(true)} className="md:hidden text-white mr-4">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <h1 className="text-xl sm:text-2xl font-bold">My Dashboard</h1>
      </div>
      <div className="flex items-center space-x-2">
        <span className="text-sm font-semibold hidden sm:inline">{userProfile.name}</span>
        <img src={userProfile.imageUrl} alt="User Profile" className="h-10 w-10 rounded-full border-2 border-white" />
      </div>
    </div>
  );
}


function Card({ contract, onClose }) {
  const [showEvidence, setShowEvidence] = useState(false);

  const getColorClass = (value) => {
    if (value === 'High' || (typeof value === 'number' && value < 0.5)) {
      return 'bg-red-200 text-red-800';
    }
    if (value === 'Medium' || (typeof value === 'number' && value >= 0.5 && value < 0.8)) {
      return 'bg-yellow-200 text-yellow-800';
    }
    return 'bg-green-200 text-green-800';
  };

  return (
    <div className="relative p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-lg m-4 overflow-y-auto">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold">
        &times;
      </button>

      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8">
        <div className="flex-1">
          <div className="mb-6 pb-6 border-b border-gray-200">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">{contract.name}</h2>
            <div className="text-xs sm:text-sm text-gray-600 mt-1">
              <p>Parties: {contract.parties}</p>
              <p>Dates: {contract.start} to {contract.expiry}</p>
              <span className={`inline-block py-1 px-3 rounded-full text-xs font-semibold mr-2 ${getColorClass(contract.status)}`}>
                {contract.status}
              </span>
              <span className={`inline-block py-1 px-3 rounded-full text-xs font-semibold ${getColorClass(contract.risk)}`}>
                Risk Score: {contract.risk}
              </span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">Clauses</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {contract.clauses.map((clause, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                  <h4 className="font-semibold text-gray-800">{clause.title}</h4>
                  <p className="text-sm text-gray-600 my-2">{clause.summary}</p>
                  <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getColorClass(clause.confidence)}`}>
                    Confidence: {(clause.confidence * 100).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">AI Insights</h3>
            <ul className="space-y-2">
              {contract.insights.map((insight, index) => (
                <li key={index} className="flex items-start">
                  <span className={`py-1 px-3 rounded-full text-xs font-semibold mr-2 ${getColorClass(insight.risk)}`}>
                    {insight.risk}
                  </span>
                  <p className="text-sm text-gray-700">{insight.message}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <button onClick={() => setShowEvidence(true)} className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Show Evidence Panel
            </button>
          </div>
        </div>

        <div className={`fixed inset-y-0 right-0 z-50 bg-gray-50 p-6 sm:p-8 w-64 sm:w-80 shadow-lg border-l border-gray-200 transform transition-transform duration-300 ease-in-out ${showEvidence ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-700">Evidence</h3>
            <button onClick={() => setShowEvidence(false)} className="text-gray-500 hover:text-gray-700 text-2xl font-bold">
              &times;
            </button>
          </div>
          <ul className="space-y-4">
            {contract.evidence.map((evidence, index) => (
              <li key={index} className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
                <p className="text-sm font-semibold text-gray-800">{evidence.source}</p>
                <p className="text-xs text-gray-600 my-1 italic">"{evidence.snippet}"</p>
                <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getColorClass(evidence.relevance)}`}>
                  Relevance: {(evidence.relevance * 100).toFixed(0)}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function FileUploader({ onClose }) {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
      console.log("Mock file uploaded:", e.dataTransfer.files[0].name);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      console.log("Mock file selected:", e.target.files[0].name);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-lg m-4 flex flex-col items-center justify-center text-center">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold">
        &times;
      </button>
      <h2 className="text-xl sm:text-2xl font-bold mb-4">Upload a Contract</h2>
      <div
        className={`w-full max-w-lg p-6 border-2 border-dashed rounded-lg transition-colors duration-200 ${dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleChange}
          ref={inputRef}
        />

        {file ? (
          <div className="text-gray-700">
            <p className="font-semibold">File Selected:</p>
            <p className="break-words">{file.name}</p>
            <button onClick={() => setFile(null)} className="mt-4 py-1 px-3 text-sm text-red-600 border border-red-300 rounded-md hover:bg-red-100">
              Remove
            </button>
          </div>
        ) : (
          <div>
            <p className="text-gray-500 mb-2">Drag and drop your file here, or</p>
            <button onClick={onButtonClick} className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
              Browse Files
            </button>
          </div>
        )}
      </div>
      <button onClick={onClose} className="mt-8 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200">
        Back to Dashboard
      </button>
    </div>
  );
}


function Mainbar() {
  const [filterValue, setFilterValue] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [selectedContract, setSelectedContract] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [view, setView] = useState('table');

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1);
    }, 500);
    return () => clearTimeout(timerId);
  }, [searchQuery]);

  const filteredData = contracts[0].filter(item => {
    const matchesFilter = filterValue === 'all' || item.status === filterValue || item.risk === filterValue;
    const matchesSearch = item.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                          item.parties.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
                          item.expiry.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentRows = filteredData.slice(startIndex, endIndex);

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleRowClick = (contractId) => {
    const foundContract = contracts[1].find(c => c.id === contractId);
    if (foundContract) {
      setSelectedContract(foundContract);
      setErrorMessage('');
      setView('card');
    } else {
      setErrorMessage(`No detailed view available for this contract.`);
      setSelectedContract(null);
    }
  };

  const handleBackToTable = () => {
    setSelectedContract(null);
    setErrorMessage('');
    setView('table');
  };

  const handleOpenUploader = () => {
    setView('uploader');
    setSelectedContract(null);
    setErrorMessage('');
  };

  if (view === 'uploader') {
    return <FileUploader onClose={handleBackToTable} />;
  }

  if (view === 'card') {
    return <Card contract={selectedContract} onClose={handleBackToTable} />;
  }

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-lg m-4 overflow-y-auto">
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 sm:space-x-4">
        <input
          onChange={handleSearchChange}
          value={searchQuery}
          className="w-full sm:w-1/3 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          type="text"
          placeholder="Search contracts..."
        />
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <select
            id="statusFilter"
            onChange={handleFilterChange}
            value={filterValue}
            className="w-full sm:w-48 p-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 shadow-sm"
          >
            <option value="all">Status: All</option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
            <option value="Renewal Due">Renewal Due</option>
          </select>
          <select
            id="riskFilter"
            onChange={handleFilterChange}
            value={filterValue}
            className="w-full sm:w-48 p-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 shadow-sm"
          >
            <option value="all">Risk: All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <button onClick={handleOpenUploader} className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 w-full sm:w-auto">
            Upload
          </button>
        </div>
      </div>

      {errorMessage && (
        <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
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
            {currentRows.length > 0 ? (
              currentRows.map((chat, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                  onClick={() => handleRowClick(chat.id)}
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">{chat.name}</td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">{chat.parties}</td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">{chat.expiry}</td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <span className={`py-1 px-3 rounded-full text-xs font-semibold
                      ${chat.status === 'Active' ? 'bg-green-200 text-green-600' :
                        chat.status === 'Expired' ? 'bg-red-200 text-red-600' :
                        'bg-yellow-200 text-yellow-600'}`}>
                      {chat.status}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <span className={`py-1 px-3 rounded-full text-xs font-semibold
                      ${chat.risk === 'High' ? 'bg-red-200 text-red-600' :
                        chat.risk === 'Medium' ? 'bg-yellow-200 text-yellow-600' :
                        'bg-green-200 text-green-600'}`}>
                      {chat.risk}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No matching contracts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 space-y-2 sm:space-y-0">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="flex items-center justify-center sm:justify-start space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors duration-200 w-full sm:w-auto"
        >
          <span>Previous</span>
        </button>
        <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center sm:justify-start space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors duration-200 w-full sm:w-auto"
        >
          <span>Next</span>
        </button>
      </div>
    </div>
  );
}
