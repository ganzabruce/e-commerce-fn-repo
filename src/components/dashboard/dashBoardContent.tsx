import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell
} from 'recharts';
import {
  ShoppingCart, Users, Package, TrendingUp,DollarSign,
  Clock, CheckCircle, XCircle,
} from 'lucide-react';

const DashBoardContent = () => {
  // Mock data - replace with API calls later
  const mockData = {
    overview: {
      totalProducts: 1250,
      totalUsers: 3400,
      totalOrders: 890,
      totalRevenue: 45600,
      monthlyGrowth: 12.5
    },
    recentOrders: [
      { id: '#OD1711', customer: 'john doe', amount: 900, date: '2024-06-17', status: 'approved' },
      { id: '#OD1712', customer: 'frank iva', amount: 400, date: '2024-06-01', status: 'pending' },
      { id: '#OD1713', customer: 'anthony baker', amount: 200, date: '2021-06-27', status: 'approved' },
      { id: '#OD1714', customer: 'sarah connor', amount: 650, date: '2024-06-15', status: 'rejected' },
      { id: '#OD1715', customer: 'mike johnson', amount: 320, date: '2024-06-18', status: 'approved' }
    ],
    topCustomers: [
      { name: 'john doe', orders: 490, spending: 15870 },
      { name: 'frank iva', orders: 360, spending: 21502 },
      { name: 'anthony baker', orders: 200, spending: 19680 },
      { name: 'sarah connor', orders: 180, spending: 12340 },
      { name: 'mike johnson', orders: 150, spending: 8950 }
    ],
    salesChart: [
      { month: 'Jan', sales: 4200, orders: 280 },
      { month: 'Feb', sales: 3800, orders: 420 },
      { month: 'Mar', sales: 5200, orders: 380 },
      { month: 'Apr', sales: 4600, orders: 290 },
      { month: 'May', sales: 6200, orders: 510 },
      { month: 'Jun', sales: 5800, orders: 420 }
    ],
    categoryDistribution: [
      { name: 'Electronics', value: 35, color: '#FF6B6B' },
      { name: 'Clothing', value: 25, color: '#4ECDC4' },
      { name: 'Books', value: 20, color: '#45B7D1' },
      { name: 'Home & Garden', value: 12, color: '#FFA07A' },
      { name: 'Sports', value: 8, color: '#98D8C8' }
    ]
  };

  // Types
  interface Overview {
    totalProducts: number;
    totalUsers: number;
    totalOrders: number;
    totalRevenue: number;
    monthlyGrowth: number;
  }

  interface Order {
    id: string;
    customer: string;
    amount: number;
    date: string;
    status: string;
  }

  interface Customer {
    name: string;
    orders: number;
    spending: number;
  }

  // Reusable Components
  const StatCard: React.FC<{
    title: string;
    value: string | number;
    icon: React.ReactNode;
    trend?: number;
    color: string;
  }> = ({ title, value, icon, trend, color }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-green-500 text-sm ml-1">+{trend}%</span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
          {icon}
        </div>
      </div>
    </div>
  );

  const OrderRow: React.FC<{ order: Order }> = ({ order }) => {
    const statusColors = {
      approved: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      rejected: 'bg-red-100 text-red-800'
    };

    const StatusIcon = {
      approved: CheckCircle,
      pending: Clock,
      rejected: XCircle
    };

    const Icon = StatusIcon[order.status as keyof typeof StatusIcon];

    return (
      <tr className="border-b border-gray-200 hover:bg-gray-50">
        <td className="py-3 px-4 text-sm font-medium text-gray-900">{order.id}</td>
        <td className="py-3 px-4 text-sm text-gray-700 capitalize">{order.customer}</td>
        <td className="py-3 px-4 text-sm font-semibold text-gray-900">${order.amount}</td>
        <td className="py-3 px-4 text-sm text-gray-700">{order.date}</td>
        <td className="py-3 px-4">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[order.status as keyof typeof statusColors]}`}>
            <Icon className="h-3 w-3 mr-1" />
            {order.status}
          </span>
        </td>
      </tr>
    );
  };

  const [data, setData] = useState<{
    overview: Overview;
    recentOrders: Order[];
    topCustomers: Customer[];
    salesChart: any[];
    categoryDistribution: any[];
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData(mockData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-red-600">Error loading dashboard data</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Revenue"
          value={`$${data.overview.totalRevenue.toLocaleString()}`}
          icon={<DollarSign className="h-6 w-6 text-green-600" />}
          trend={data.overview.monthlyGrowth}
          color="#10B981"
        />
        
        <StatCard
          title="Total Orders"
          value={data.overview.totalOrders.toLocaleString()}
          icon={<ShoppingCart className="h-6 w-6 text-blue-600" />}
          color="#3B82F6"
        />
        <StatCard
          title="Total Users"
          value={data.overview.totalUsers.toLocaleString()}
          icon={<Users className="h-6 w-6 text-purple-600" />}
          color="#8B5CF6"
        />
        <StatCard
          title="Total Products"
          value={data.overview.totalProducts.toLocaleString()}
          icon={<Package className="h-6 w-6 text-orange-600" />}
          color="#F59E0B"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Sales & Orders</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.salesChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill="#3B82F6" name="Sales ($)" />
              <Bar dataKey="orders" fill="#10B981" name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.categoryDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {data.categoryDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Order ID</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.recentOrders.map((order) => (
                  <OrderRow key={order.id} order={order} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Customers</h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {data.topCustomers.map((customer, index) => (
              <div key={customer.name} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full h-10 w-10 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-semibold">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 capitalize">{customer.name}</p>
                    <p className="text-sm text-gray-600">{customer.orders} orders</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">${customer.spending.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">total spent</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardContent;
