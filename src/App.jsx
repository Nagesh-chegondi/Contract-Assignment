import { Login } from "./login.jsx";
import { useState, createContext } from "react";
import { Dashboard } from "./Dashboard.jsx";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const CountContext = createContext();

function CountProvider({ children }) {
  const [count, setcount] = useState(true);
  return (
    <CountContext.Provider value={{ count, setcount }}>
      {children}
    </CountContext.Provider>
  );
}

// 👇 Create a wrapper so we can use useNavigate properly
function AppWrapper() {
  return (
    <BrowserRouter>
      <CountProvider>
        <App />
      </CountProvider>
    </BrowserRouter>
  );
}

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/Dashboard");
    } else {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default AppWrapper;
