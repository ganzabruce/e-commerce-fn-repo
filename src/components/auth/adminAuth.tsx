import React, { useState, useContext } from 'react';
import { adminContext } from '../../context/adminContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLoginPages = () => {
  const { dispatch } = useContext(adminContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string | null>(null);
  const navigate = useNavigate()

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    try {
      setIsLoading(true);
      setErrors(null);
      const response = await axios.post(
        "https://e-commerce-bn-project-a9qh.onrender.com/api/auth/admin/login",
        { email, password }
      );
      console.log("logged in admin:", response.data);
      dispatch({ type: "login", payload: response.data.data });
      localStorage.setItem("admin",JSON.stringify(response.data.data))
      navigate("/admin/dashboard")
      window.location.reload();
    } catch (error: any) {
      console.error(error);
      const message = error.response?.data?.error || error.message || "Login failed";
      setErrors(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-8"
    >
      <h1 className='text-2xl mb-5 text-center'>admin's panel</h1>
      <div className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors ? "border-red-300" : "border-gray-300"
            } rounded-md focus:ring-amber-400 focus:border-amber-400 sm:text-sm`}
            placeholder="Enter your email"
          />
        </div>
        
        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`mt-1 block w-full px-3 py-2 border ${
              errors ? "border-red-300" : "border-gray-300"
            } rounded-md focus:ring-amber-400 focus:border-amber-400 sm:text-sm`}
            placeholder="Enter your password"
          />
        </div>

        {/* Error Message */}
        {errors && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3">
            <p className="text-sm text-red-600">{errors}</p>
          </div>
        )}

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center py-2 px-4 rounded-md text-white bg-amber-400 hover:bg-amber-500 focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Signing in...
              </div>
            ) : (
              "Sign in"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AdminLoginPages;
