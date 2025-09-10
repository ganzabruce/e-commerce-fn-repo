import { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import type { DashboardData } from '../types/admin';

export const useAdminData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Make parallel API calls
      const [overview, recentOrders, topCustomers, salesChart] = await Promise.all([
        apiService.getDashboardOverview(),
        apiService.getRecentOrders(),
        apiService.getTopCustomers(),
        apiService.getSalesData(),
      ]);

      setData({
        overview,
        recentOrders,
        topCustomers,
        salesChart,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return { data, loading, error, refetch: fetchDashboardData };
};