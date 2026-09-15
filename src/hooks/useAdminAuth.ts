import { useAuthStore } from '../store/authStore';
export const useAdminAuth = () => {
  const { user, isAuthenticated } = useAuthStore();
  const isAdmin = user && ['super_admin', 'admin', 'manager', 'staff'].includes(user.role);
  return { user, isAuthenticated, isAdmin, role: user?.role };
};
