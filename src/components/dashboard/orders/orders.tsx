import { useState, useEffect } from "react";
import axios from "axios";

interface OrderItem {
  productId: string;
  quantity: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalPrice: number;
  createdAt: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  
  description?: string;
  imageUrl?: string;
  category?: string;
}

type ProductsMap = Record<string, Product>;

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [_products, setProducts] = useState<ProductsMap>({}); // productId -> Product

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get<{ orders: Order[] } | Order[]>(
        "http://localhost:3001/api/routes/orders"
      );

      const ordersData = Array.isArray(response.data)
        ? response.data
        : response.data.orders;

      setOrders(ordersData);
      await fetchProductDetails(ordersData);
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Failed to load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchProductDetails = async (ordersData: Order[]) => {
    try {
      const productIds = [
        ...new Set(
          ordersData.flatMap((order) =>
            order.items.map((item) => item.productId)
          )
        ),
      ];

      if (productIds.length === 0) return;

      const productsResponse = await axios.post<
        { products: Product[] } | Product[]
      >("http://localhost:3001/api/routes/products/batch", {
        productIds,
      });

      const productsData = Array.isArray(productsResponse.data)
        ? productsResponse.data
        : productsResponse.data.products;

      const productsMap: ProductsMap = {};
      productsData.forEach((product) => {
        productsMap[product._id] = product;
      });

      setProducts(productsMap);
    } catch (err) {
      console.error("Error fetching product details:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // const formatDate = (dateString: string): string => {
  //   const date = new Date(dateString);
  //   return date.toLocaleDateString("en-US", {
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   });
  // };

  // const getStatusColor = (status: string): string => {
  //   const colors: Record<string, string> = {
  //     pending: "bg-yellow-100 text-yellow-800",
  //     processing: "bg-blue-100 text-blue-800",
  //     shipped: "bg-purple-100 text-purple-800",
  //     delivered: "bg-green-100 text-green-800",
  //     cancelled: "bg-red-100 text-red-800",
  //     refunded: "bg-gray-100 text-gray-800",
  //   };
  //   return colors[status] || "bg-gray-100 text-gray-800";
  // };

  // const getOrderStatus = (order: Order): string => {
  //   const orderDate = new Date(order.createdAt);
  //   const now = new Date();
  //   const diffTime = Math.abs(now.getTime() - orderDate.getTime());
  //   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  //   if (diffDays < 1) return "processing";
  //   if (diffDays < 3) return "shipped";
  //   if (diffDays < 7) return "delivered";
  //   return "completed";
  // };

  // const getProductName = (productId: string): string => {
  //   return products[productId]?.name || `Product #${productId.slice(-6)}`;
  // };

  // --- Same JSX as before ---
  // (No changes needed for rendering, since types are enforced above)

  // --- Same JSX as before ---
  // (No changes needed for rendering, since types are enforced above)

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
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Error Loading Orders
          </h2>
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
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            No Orders Found
          </h2>
          <p className="text-gray-600 mb-4">
            There are no orders in the database yet.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      {/* ... your JSX remains unchanged ... */}
    </div>
  );
};

export default Orders;
