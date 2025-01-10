import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import axios from "axios";
import { getBaseUrl } from "../utils/getBaseUrl";

const AdminLogin = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();

  
  const onSubmit = async(data) => { 
    
    try {
      const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
        headers: {
          'Content-Type' : 'application/json'
        }
      })

      const auth = response.data;
      console.log(auth);
      if(auth.token){
        localStorage.setItem('token', auth.token);
        setTimeout(() => {
          localStorage.removeItem('token')
          alert('Token has been expired, please login again')
          navigate('/admin')
        }, 3600 * 100)
      }

      alert("Login Successful");
      navigate("/dashboard")

    } catch (err) {
      console.error("Login error:", err);
    }
  }
  

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt6 pb-8 mb-4">
        <h2 className="text-center text-xl font-semibold mb-4"> Admin </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input 
            {...register("username", {required: true})}
            type="username" name="username" id="username" placeholder="username" className="shadow appearance-none border rounded w-full py-2 px-3 leading-right focus:outline-none focus:shadow" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input 
            {...register("password", { required: true })}
            type="password" name="password" id="password" placeholder="Password" className="shadow appearance-none border rounded w-full py-2 px-3 leading-right focus:outline-none focus:shadow" />
          </div>
          {
            message && <p className="text-red-500 text-xs italic mb-3">Email and password do not match, try again</p>
          }
          <div>
            <button className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none">Login</button>
          </div>
        </form>

        <p className="mt-5 text-center text-gray-500 text-xs">&copy; 2025 Book Store. All rights reserved</p>
      </div>
    </div>
  )
} 

export default AdminLogin