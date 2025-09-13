import AdminLoginPages from './adminAuth'
import axios from "axios"
import  { useState } from 'react'
import { useUserContext } from '../../hooks/useUserContext'
const LoginForm = ()=>{
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [errors,setErrors] = useState(null)
  const {dispatch} = useUserContext()
  const [isLoading ,setIsLoading] = useState(false)

  const handleLogin = async(e?: React.FormEvent) =>{
    if (e) e.preventDefault();
    setIsLoading(true)
    setErrors(null)
    const response = await axios.post("https://e-commerce-bn-project-a9qh.onrender.com/api/auth/login",{email,password})
    try {
      console.log("logged in user:", response.data);
      dispatch({ type: "login", payload: response.data.data });
      localStorage.setItem("user",JSON.stringify(response.data.data))
      window.location.reload(); 
    } catch (error:any) {
      console.error(error);
      const message = error.response?.data?.error || error.message || "Signup failed";
      setErrors(message)
    }finally {
      setIsLoading(false);
    }
  }
  return(
    <form className="flex flex-col gap-3">
      <h1>Login:</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          className="border px-3 py-2 rounded-lg outline-none focus:ring focus:ring-amber-300"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="border px-3 py-2 rounded-lg outline-none focus:ring focus:ring-amber-300"
        />
        {errors && <div className='text-red-500'>{errors}</div>}
        <button
          type="submit"
          className="bg-amber-300 text-black py-2 rounded-lg font-semibold hover:bg-amber-400"
          onClick={handleLogin}
        >
        {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Logging in...
              </div>
            ) : (
              "Login"
            )}
        </button>
    </form>
  )
}
const SignupForm = () =>{
  const [username,setUsername] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const {dispatch} = useUserContext()
  const [errors,setErrors] = useState(null)
  const [isLoading ,setIsLoading] = useState(false)

  const handleSignup = async(e?: React.FormEvent) =>{
    if (e) e.preventDefault();
    setIsLoading(true)
    setErrors(null)
    const response = await axios.post("https://e-commerce-bn-project-a9qh.onrender.com/api/auth/signup",{username,email,password})
    try {
      console.log("logged in user:", response.data);
      dispatch({ type: "login", payload: response.data.data });
      localStorage.setItem("user",JSON.stringify(response.data.data))
      window.location.reload();
    } catch (error:any) {
      console.error(error);
      const message = error.response?.data?.error || error.message || "Login failed";
      setErrors(message)
    }finally {
      setIsLoading(false);
    }
  }

  return(
    <form className="flex flex-col gap-3">
        <h1>signup:</h1>
        <input
          type="text"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          placeholder="Username"
          className="border px-3 py-2 rounded-lg outline-none focus:ring focus:ring-amber-300"
        />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e)=>setEmail(e.target.value)}
        className="border px-3 py-2 rounded-lg outline-none focus:ring focus:ring-amber-300"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
        className="border px-3 py-2 rounded-lg outline-none focus:ring focus:ring-amber-300"
      />
      {errors && <div className='text-red-500'>{errors}</div>}
      <button
          type="submit"
          className="bg-amber-300 text-black py-2 rounded-lg font-semibold hover:bg-amber-400"
          onClick={handleSignup}
        >
        {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Signing up...
              </div>
            ) : (
              "Sign up"
            )}
        </button>
    </form>
  )
}

const UsersPanel = () =>{
  const [users,setUsers] = useState("signup")
  return(
    <div className="users">
      {users === "login" && <LoginForm />}
      {users === "signup" && <SignupForm />}
      {users === "signup" && <button onClick={()=>setUsers("login")}>already have an account</button>}
      {users === "login" && <button onClick={()=>setUsers("signup")}>create an account</button>}
      
      
    </div>
  )
}

const AuthModal =() =>{
  const [modal ,setModal] = useState("user")
  return(
    <div className="authmodal">
      {modal ==="user" && <h1 className='text-2xl mb-5 text-center'>user's panel</h1>}
      {modal ==="user" && <UsersPanel />}
      {modal ==="admin" && <AdminLoginPages />}
      {modal === "user" && <button onClick={()=>setModal("admin")}>admins panel</button>}
      {modal === "admin" && <button onClick={()=>setModal("user")}>users panel</button>}
    </div>
  )
}


export default AuthModal