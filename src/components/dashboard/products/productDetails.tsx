import axios from 'axios';
import  { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
  const [showEditForm, _setShowEditForm] = useState(false);
  const [product, setProduct] = useState<Product | null>(null); // ✅ allow null before fetch
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // ✅ error is a string or null
  const [message, _setMessage] = useState<string | null>(null); // ✅ message is a string or null

  const { id } = useParams<{ id: string }>(); // ✅ ensure id is typed

  // const handleDelete = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await axios.delete(`http://localhost:3001/api/routes/products/${id}`);
  //     if (response.status === 200) {
  //       setMessage('Product deleted successfully!');
  //       setTimeout(() => navigate("/"), 3000); // ✅ use setTimeout, not setInterval
  //     } else {
  //       setMessage('Failed to delete product. Please try again.');
  //     }
  //   } catch (error: any) {
  //     console.error('Error deleting product:', error);
  //     setMessage('An error occurred while deleting the product.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get<{ product: Product }>(
        `http://localhost:3001/api/routes/products/${id}`
      );
      setProduct(response.data.product);
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

  // const getStockStatus = (quantity: number) => {
  //   if (quantity === 0) return { text: 'Out of Stock', color: 'text-red-600', bgColor: 'bg-red-100' };
  //   if (quantity <= 10) return { text: 'Low Stock', color: 'text-orange-600', bgColor: 'bg-orange-100' };
  //   return { text: 'In Stock', color: 'text-green-600', bgColor: 'bg-green-100' };
  // };

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

  // const stockStatus = getStockStatus(product.quantity);

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {message && <div className="bg-green-400 px-5 py-3">{message}</div>}
      {showEditForm && <EditProductForm id={id!} />}
      {/* ... rest of JSX unchanged */}
    </div>
  );
};

export default ProductDetails;
