import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import EditProductForm from './editProductForm';

interface productProps{
    _id: string;
    name: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
    quantity: number;
}



const ProductDetails = () => {
  const [showEditForm ,setShowEditForm] = useState(false)
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message,setMessage] = useState()
  const navigate = useNavigate()
  const { id } = useParams();
  const handleDelete =  async() =>{
    setLoading(true)
    try {
      const response = await axios.delete(`http://localhost:3001/api/routes/products/${id}`);
      if (response.status === 200) {
        setMessage('Product deleted successfully!');
      } else {
        setMessage('Failed to update product. Please try again.');
      }
      setInterval(navigate("/"),[3000])
    } catch (error) {
      console.error('Error updating product:', error);
      setMessage('An error occurred while updating the product.');
    } finally {
      setLoading(false)
    }
  }
  const fetchProduct = async () => {
    try {
      setLoading(true);
      console.log(id)
      const response = await axios.get(`http://localhost:3001/api/routes/products/${id}`);
      console.log(response.data.product);
      setProduct(response.data.product)
    } catch (error) {
      console.error('Error fetching product:', error);
      setError('Failed to load product details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { text: 'Out of Stock', color: 'text-red-600', bgColor: 'bg-red-100' };
    if (quantity <= 10) return { text: 'Low Stock', color: 'text-orange-600', bgColor: 'bg-orange-100' };
    return { text: 'In Stock', color: 'text-green-600', bgColor: 'bg-green-100' };
  };

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
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Product</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchProduct}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto p-6 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
          <svg className="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <Link 
            to="/" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const stockStatus = getStockStatus(product.quantity);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
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
              <Link to="/" className="ml-1 text-gray-700 hover:text-blue-600 md:ml-2">Products</Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
              </svg>
              <span className="ml-1 text-gray-500 md:ml-2">{product.name}</span>
            </div>
          </li>
        </ol>
      </nav>
      {message && <div className='bg-green-400 px-5 py-3'>{message}</div>}
      {showEditForm && <EditProductForm id={id} />}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Image */}
          <div className="flex justify-center items-start">
            <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center p-8">
              <svg className="w-24 h-24 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex items-center mt-2">
                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${stockStatus.bgColor} ${stockStatus.color}`}>
                  {stockStatus.text}
                </span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-sm text-gray-600">SKU: {product._id.slice(-8).toUpperCase()}</span>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-blue-600">${product.price.toLocaleString()}</h2>
              <p className="text-sm text-gray-600 mt-1">ex. tax</p>
            </div>

            <div className="border-t border-b border-gray-200 py-4">
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-600">Category</h3>
                <p className="text-gray-900 font-medium">{product.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Available Quantity</h3>
                <p className="text-gray-900 font-medium">{product.quantity} units</p>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button 
                className={`flex-1 px-6 py-3 rounded-lg font-medium ${product.quantity === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white transition-colors`}
                disabled={product.quantity === 0} onClick={()=>setShowEditForm(true)}
              >
                <i className="fa-solid fa-pen-to-square"></i> Edit
              </button>
              <button className="p-3 border border-red-300 rounded-lg hover:bg-red-100 transition-colors" onClick={handleDelete}>
                <i className="fa-solid fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-gray-50 p-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-600">Product ID</h4>
              <p className="text-gray-900">{product._id}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-600">Last Updated</h4>
              <p className="text-gray-900">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Products Link */}
      <div className="mt-8 text-center">
        <Link 
          to="/" 
          className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
          </svg>
          Back to Products
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;