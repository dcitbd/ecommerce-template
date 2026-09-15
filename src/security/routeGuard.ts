import { UserProfile } from '../types/auth';

export function canAccessCustomerRoute(user: UserProfile | null): boolean {
  return !!user;
}

export function canAccessAdminRoute(user: UserProfile | null): boolean {
  if (!user) return false;
  return ['super_admin', 'admin', 'manager', 'staff'].includes(user.role);
}
