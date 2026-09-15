import { rolePermissionMap } from '../config/permissionConfig';

export function hasPermission(userRole: string, requiredPermission: string): boolean {
  const permissions = rolePermissionMap[userRole] || [];
  if (permissions.includes('*')) return true;
  if (permissions.includes(requiredPermission)) return true;

  const [module] = requiredPermission.split('.');
  if (permissions.includes(`${module}.*`)) return true;

  return false;
}
