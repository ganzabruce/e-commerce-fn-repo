import axios from 'axios';
import  { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import EditProductForm from './editProductForm';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  quantity: number;
}

const ProductDetails = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [editPro,setEdit] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get<{ product: Product }>(
        `http://localhost:3001/api/routes/products/${id}`
      );
      setProduct(response.data.product);
    } catch (err) {
      console.error('Error fetching product:', err);
      setError('Failed to load product details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `http://localhost:3001/api/routes/products/${id}`
      );
      if (response.status === 200) {
        setMessage('Product deleted successfully!');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setMessage('Failed to delete product.');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      setMessage('An error occurred while deleting the product.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchProduct();
  }, [id]);

  const getStockStatus = (quantity: number) => {
    if (quantity === 0)
      return { text: 'Out of Stock', color: 'text-red-600', bg: 'bg-red-100' };
    if (quantity <= 10)
      return { text: 'Low Stock', color: 'text-orange-600', bg: 'bg-orange-100' };
    return { text: 'In Stock', color: 'text-green-600', bg: 'bg-green-100' };
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
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Product</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchProduct}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
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
          <h2 className="text-xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const stock = getStockStatus(product.quantity);

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li>
            <Link to="/" className="text-gray-700 hover:text-blue-600 flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7..." />
              </svg>
              Home
            </Link>
          </li>
          <li>
            <Link to="/" className="ml-1 text-gray-700 hover:text-blue-600">
              Products
            </Link>
          </li>
          <li aria-current="page">
            <span className="ml-1 text-gray-500">{product.name}</span>
          </li>
        </ol>
      </nav>
      {editPro && <div><EditProductForm id={product._id} /></div>}
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          {message}
        </div>
      )}

      {/* Product Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Image */}
          <div className="flex justify-center items-center">
            <img
              src={product.imageUrl || '/placeholder.png'}
              alt={product.name}
              className="w-64 h-64 object-cover rounded-lg border"
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="mt-2 text-xl text-blue-600 font-semibold">
                ${product.price.toFixed(2)}
              </p>
              <span
                className={`inline-block mt-3 px-3 py-1 text-sm font-semibold rounded-full ${stock.bg} ${stock.color}`}
              >
                {stock.text}
              </span>
            </div>

            <p className="text-gray-700">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 border-t border-b py-4">
              <div>
                <h3 className="text-sm font-medium text-gray-600">Category</h3>
                <p className="text-gray-900">{product.category}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-600">Quantity</h3>
                <p className="text-gray-900">{product.quantity}</p>
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button onClick={()=>setEdit(true)} className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium">
                <i className="fa-solid fa-pen-to-square mr-2"></i> Edit Product
              </button>
              <button
                onClick={handleDelete}
                className="p-3 border border-red-300 rounded-lg hover:bg-red-100"
              >
                <i className="fa-solid fa-trash text-red-600"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Extra Info */}
        <div className="bg-gray-50 p-6 border-t">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-600">Product ID</h4>
              <p className="text-gray-900 font-mono text-sm">{product._id}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-600">Added On</h4>
              <p className="text-gray-900">{new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Back */}
      <div className="mt-8 text-center">
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M9 15L3 9m0 0l6-6M3 9h12..." />
          </svg>
          Back to Products
        </Link>
      </div>
    </div>
  );
};

export default ProductDetails;
