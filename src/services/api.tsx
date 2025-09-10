const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  private async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const token = localStorage.getItem('adminToken'); // For authentication
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...options,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }
    
    return response.json();
  }

  // Dashboard endpoints
  async getDashboardOverview() {
    return this.request<Overview>('/admin/overview');
  }

  async getRecentOrders(limit = 10) {
    return this.request<Order[]>(`/admin/orders?limit=${limit}&sort=-createdAt`);
  }

  async getTopCustomers(limit = 5) {
    return this.request<Customer[]>(`/admin/customers/top?limit=${limit}`);
  }

  async getSalesData(period = '6months') {
    return this.request<any[]>(`/admin/sales?period=${period}`);
  }

  async getProducts(page = 1, limit = 20) {
    return this.request<{products: Product[], total: number}>(`/admin/products?page=${page}&limit=${limit}`);
  }
}

export const apiService = new ApiService();