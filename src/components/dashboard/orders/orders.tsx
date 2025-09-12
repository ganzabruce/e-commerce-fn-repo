import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState({}); // To store product details

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/api/routes/orders');
      const ordersData = response.data.orders || response.data;
      setOrders(ordersData);
      
      // Fetch product details for each order item
      await fetchProductDetails(ordersData);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to load orders. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductDetails = async (ordersData) => {
    try {
      // Extract all unique product IDs from orders
      const productIds = [...new Set(
        ordersData.flatMap(order => 
          order.items.map(item => item.productId)
        )
      )];
      
      if (productIds.length === 0) return;
      
      // Fetch product details for all products at once
      const productsResponse = await axios.post('http://localhost:3001/api/routes/products/batch', {
        productIds
      });
      
      const productsData = productsResponse.data.products || productsResponse.data;
      const productsMap = {};
      
      productsData.forEach(product => {
        productsMap[product._id] = product;
      });
      
      setProducts(productsMap);
    } catch (error) {
      console.error('Error fetching product details:', error);
      // Continue even if product details fail to load
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'processing': 'bg-blue-100 text-blue-800',
      'shipped': 'bg-purple-100 text-purple-800',
      'delivered': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
      'refunded': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getOrderStatus = (order) => {
    // Simple logic to determine order status based on creation date
    const orderDate = new Date(order.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - orderDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) return 'processing';
    if (diffDays < 3) return 'shipped';
    if (diffDays < 7) return 'delivered';
    return 'completed';
  };

  const getProductName = (productId) => {
    return products[productId]?.name || `Product #${productId.slice(-6)}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
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
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error Loading Orders</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchOrders}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="container mx-auto p-6 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 max-w-md mx-auto">
          <svg className="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
          </svg>
          <h2 className="text-xl font-bold text-gray-800 mb-2">No Orders Found</h2>
          <p className="text-gray-600 mb-4">There are no orders in the database yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Order Management</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
          View Analytics
        </button>
      </div>
      
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Products
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => {
              const status = getOrderStatus(order);
              return (
                <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">#{order._id.slice(-8)}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">
                      {order.items.slice(0, 2).map((item, index) => (
                        <div key={index} className="mb-1">
                          {getProductName(item.productId)} × {item.quantity}
                        </div>
                      ))}
                      {order.items.length > 2 && (
                        <div className="text-xs text-gray-500 mt-1">
                          +{order.items.length - 2} more items
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-green-600">
                      ${order.totalPrice.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {formatDate(order.createdAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Link 
                      to={`/orders/${order._id}`}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      View
                    </Link>
                    <button className="text-red-600 hover:text-red-900">
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile/Tablet Card View */}
      <div className="lg:hidden grid gap-4 sm:grid-cols-1">
        {orders.map((order) => {
          const status = getOrderStatus(order);
          return (
            <div key={order._id} className="bg-white border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg leading-tight">
                    Order #{order._id.slice(-8)}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(status)}`}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-700">Total Amount:</span>
                  <span className="text-sm font-semibold text-green-600">
                    ${order.totalPrice.toLocaleString()}
                  </span>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-700">Items:</span>
                  <div className="mt-1 space-y-1">
                    {order.items.slice(0, 3).map((item, index) => (
                      <div key={index} className="text-sm text-gray-600">
                        • {getProductName(item.productId)} × {item.quantity}
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{order.items.length - 3} more items
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                <Link 
                  to={`/orders/${order._id}`}
                  className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                >
                  View Details
                </Link>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-md hover:bg-blue-200">
                    Track
                  </button>
                  <button className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-md hover:bg-red-200">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 text-sm text-gray-600 text-center lg:text-left">
        Total Orders: {orders.length} • Total Revenue: $
        {orders.reduce((total, order) => total + order.totalPrice, 0).toLocaleString()}
      </div>
    </div>
  );
};

export default Orders;