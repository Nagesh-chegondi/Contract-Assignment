import {Login }from  './login.jsx'
import {useState,createContext,useContext} from 'react'
import{Navbar} from './Navbar.jsx'
import {Dashboard} from './Dashboard.jsx'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
const CountContext = createContext();

function CountProvider({children}){
  const[count,setcount] = useState(true)
  return(
   
  <CountContext.Provider value={{
    count:count,
    setcount:setcount
  }}>
    {children}

    </CountContext.Provider>
  )
   
  

  


}

function App() {
  
  return (
    <>
    <CountProvider>

   < BrowserRouter>
   <Routes>
    <Route path = "/" element ={<Login/>}/>
    <Route path = "/Dashboard" element = {<Dashboard/>}/>
   </Routes>
   </BrowserRouter>
   </CountProvider>
    
    {/* { count?<Login setcount ={setcount}/>:null}
    {count? null:<Dashboard/>} */}
      
    </>
  )
}

export default App
