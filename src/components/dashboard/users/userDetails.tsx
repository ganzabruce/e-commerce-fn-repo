import axios from 'axios';
import  { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

interface UserProps {
  _id: string;
  username: string;
  email: string;
}

const UserDetails = () => {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | undefined>();
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`http://localhost:3001/api/routes/user/${id}`);
      if (response.status === 200) {
        setMessage('User deleted successfully!');
        setTimeout(() => navigate("/users"), 2000);
      } else {
        setMessage('Failed to delete user. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage('An error occurred while deleting the user.');
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
      console.log(id);
      const response = await axios.get(`http://localhost:3001/api/routes/user/${id}`);
      console.log("user :",response.data.user);
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user:', error);
      setError('Failed to load user details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUser();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <svg className="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading User</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchUser}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
          <svg className="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <h2 className="text-xl font-bold text-gray-800 mb-2">User Not Found</h2>
          <p className="text-gray-600 mb-4">The user you're looking for doesn't exist.</p>
          <Link 
            to="/users" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Users
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link to="/" className="inline-flex items-center text-gray-700 hover:text-blue-600">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
              </svg>
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              <Link to="/users" className="ml-1 text-gray-700 hover:text-blue-600 md:ml-2">Users</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              <span className="ml-1 text-gray-500 md:ml-2">{user.username}</span>
            </div>
          </li>
        </ol>
      </nav>
      
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          {message}
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* User Avatar */}
          <div className="flex justify-center items-start">
            <div className="w-64 h-64 bg-blue-100 rounded-full flex items-center justify-center">
              <svg className="w-32 h-32 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>

          {/* User Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.username}</h1>
              <div className="flex items-center mt-2">
                <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                  Active User
                </span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-sm text-gray-600">ID: {user._id.slice(-8).toUpperCase()}</span>
              </div>
            </div>

            <div className="border-t border-b border-gray-200 py-4">
              <div className="flex items-center mb-3">
                <svg className="w-5 h-5 text-gray-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <p className="text-gray-700">{user.email}</p>
              </div>
              
              <div className="flex items-center">
                <svg className="w-5 h-5 text-gray-500 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-700">Joined 3 months ago</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-600">Account Type</h3>
                <p className="text-gray-900 font-medium">Standard User</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Last Login</h3>
                <p className="text-gray-900 font-medium">Today, 10:30 AM</p>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button 
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                // onClick={() => setShowEditForm(true)}
              >
                <i className="fa-solid fa-pen-to-square mr-2"></i> Edit User
              </button>
              <button 
                className="p-3 border border-red-300 rounded-lg hover:bg-red-100 transition-colors" 
                onClick={handleDelete}
              >
                <i className="fa-solid fa-trash text-red-600"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-600">User ID</h4>
              <p className="text-gray-900 font-mono text-sm">{user._id}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-600">Member Since</h4>
              <p className="text-gray-900">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Users Link */}
      <div className="mt-8 text-center">
        <Link 
          to="/users" 
          className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg>
          Back to Users
        </Link>
      </div>
    </div>
  );
};

export default UserDetails;