import { useAuthStore } from '../store/authStore';
import { hasPermission } from '../security/permissionGuard';

export const usePermission = (permission: string): boolean => {
  const { user } = useAuthStore();
  if (!user) return false;
  return hasPermission(user.role, permission);
};
