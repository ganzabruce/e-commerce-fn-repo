import {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddProductForm from './addProductForm';

const ProductsTable = () => {
  const [dummyProducts, setDummyProducts] = useState();
  const [showAdd,setAdd] = useState();

  const fetchProduct = async() => {
    try {
      const response = await axios.get('http://localhost:3001/api/routes/products');
      setDummyProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (!dummyProducts) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  const getCategoryColor = (category) => {
    const colors = {
      'Electronics': 'bg-blue-100 text-blue-800',
      'Footwear': 'bg-green-100 text-green-800',
      'Clothing': 'bg-purple-100 text-purple-800',
      'Home & Kitchen': 'bg-orange-100 text-orange-800',
      'Books': 'bg-yellow-100 text-yellow-800',
      'Sports & Fitness': 'bg-red-100 text-red-800',
      'Food & Beverages': 'bg-pink-100 text-pink-800',
      'Furniture': 'bg-indigo-100 text-indigo-800',
      'Games & Toys': 'bg-teal-100 text-teal-800',
      'Health & Wellness': 'bg-emerald-100 text-emerald-800',
      'Home & Garden': 'bg-lime-100 text-lime-800',
      'Accessories': 'bg-cyan-100 text-cyan-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { text: 'Out of Stock', color: 'text-red-600' };
    if (quantity <= 10) return { text: 'Low Stock', color: 'text-orange-600' };
    return { text: 'In Stock', color: 'text-green-600' };
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Product Inventory</h1>
      {showAdd && <AddProductForm />}
      <button 
          className={`flex-1 px-6 py-3 rounded-lg font-medium bg-blue-400 cursor-not-allowed hover:bg-blue-700' text-white transition-colors`}
          onClick={()=>{setAdd(true)}}
        >
        <i className="fa-solid fa-pen-to-square"></i> Edit
        </button>
      
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {dummyProducts.map((product, index) => {
              const stockStatus = getStockStatus(product.quantity);
              return (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{product.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-lg font-semibold text-green-600">
                      ${product.price.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Link 
                      to={`/product/info/${product._id}`} 
                      state={{ product }} 
                      className="text-sm text-blue-600 hover:text-blue-800 hover:underline max-w-xs truncate block"
                    >
                      {product.description}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(product.category)}`}>
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {product.quantity}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`text-sm font-medium ${stockStatus.color}`}>
                      {stockStatus.text}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        
        {dummyProducts.map((product, index) => {
          const stockStatus = getStockStatus(product.quantity);
          return (
            <div key={index} className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-900 text-lg leading-tight">{product.name}</h3>
                <span className="text-lg font-bold text-green-600 ml-2">
                  ${product.price.toLocaleString()}
                </span>
              </div>
              
              <Link 
                to={`/product/info/${product._id}`} 
                state={{ product }}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline mb-3 line-clamp-2 block"
              >
                {product.description}
              </Link>
              
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryColor(product.category)}`}>
                  {product.category}
                </span>
                
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-gray-700">
                    <span className="font-medium">Qty:</span> {product.quantity}
                  </span>
                  <span className={`font-medium ${stockStatus.color}`}>
                    {stockStatus.text}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 text-sm text-gray-600 text-center lg:text-left">
        Total Products: {dummyProducts.length}
      </div>
    </div>
  );
};

export default ProductsTable;