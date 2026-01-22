import { useQuery } from '@tanstack/react-query';
import { db } from '@/lib/supabase-helpers';

export interface AdminStats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  recentOrders: Array<{
    id: string;
    order_number: string;
    customer_name: string;
    total: number;
    status: string;
    created_at: string;
  }>;
  ordersByStatus: Record<string, number>;
}

export const useAdminStats = () => {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async (): Promise<AdminStats> => {
      // Fetch products count
      const { count: productsCount } = await db
        .from('products')
        .select('*', { count: 'exact', head: true });

      // Fetch orders
      const { data: orders } = await db
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      // Fetch users count
      const { count: usersCount } = await db
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      const ordersList = (orders || []) as any[];
      
      // Calculate total revenue from paid orders
      const totalRevenue = ordersList
        .filter(o => o.payment_status === 'paid')
        .reduce((sum, o) => sum + Number(o.total), 0);

      // Count orders by status
      const ordersByStatus: Record<string, number> = {};
      ordersList.forEach(o => {
        ordersByStatus[o.status] = (ordersByStatus[o.status] || 0) + 1;
      });

      // Get recent orders (last 5)
      const recentOrders = ordersList.slice(0, 5).map(o => ({
        id: o.id,
        order_number: o.order_number,
        customer_name: o.customer_name,
        total: Number(o.total),
        status: o.status,
        created_at: o.created_at,
      }));

      return {
        totalProducts: productsCount || 0,
        totalOrders: ordersList.length,
        totalUsers: usersCount || 0,
        totalRevenue,
        recentOrders,
        ordersByStatus,
      };
    },
  });
};
