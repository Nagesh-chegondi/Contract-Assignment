import {useNavigate} from 'react-router-dom'
import {useRef} from 'react'
export function Login() {

    
    const navigate = useNavigate();
    const ref1   = useRef()
    const ref2   = useRef()
      
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-12 w-96 flex flex-col gap-6 justify-center items-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Login</h2>
        
        <div className="w-full flex flex-col space-y-2">
          <label htmlFor="input" className="text-gray-600 font-medium">Username</label>
          <input
            ref={ref1} className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            type="text"
            id="input"
            placeholder="Enter your username"
          />
        </div>
        
        <div className="w-full flex flex-col space-y-2">
          <label htmlFor="pass" className="text-gray-600 font-medium">Password</label>
          <input
             ref ={ref2} className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            type="password"
            id="pass"
            placeholder="Password"
          />
        </div>
        
        <div className="mt-4 w-full">
          <button
            onClick={() => {
                const res =signin(ref1,ref2)
                if(res){
                 navigate('/dashboard');
                }
                else{
                    alert('please enter valid username and password')
                }
              
               
              
            }}
            className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-md"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

function signin(ref1,ref2){
   const username = ref1.current.value.trim()
   console.log(username)
   const  password = ref2.current.value;
   console.log(username)
   console.log(password)
   if( username!==''&&password==='test123'){
     const chars = '0123456789abcdef';
  let out = '';
  for (let i = 0; i < 48; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  JSON.stringify(out)
  console.log(out)
  localStorage.setItem("token", out)
    return true
   }
   else{
    if(username===''){
        return false
    }
   }



}