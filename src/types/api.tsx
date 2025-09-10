export interface Overview {
  totalProducts: number;
  totalUsers: number;
  totalOrders: number;
  totalRevenue: number;
  monthlyGrowth: number;
}

export interface Order {
  _id: string;
  customer: {
    name: string;
    email: string;
  };
  totalAmount: number;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'shipped' | 'delivered';
  items: OrderItem[];
}

export interface OrderItem {
  product: {
    _id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

export interface Customer {
  _id: string;
  name: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
}

export interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  sold: number;
}

export interface DashboardData {
  overview: Overview;
  recentOrders: Order[];
  topCustomers: Customer[];
  salesChart: Array<{
    month: string;
    sales: number;
    orders: number;
  }>;
}