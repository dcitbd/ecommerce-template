import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { hasPermission } from '../security/permissionGuard';

export const RoleProtectedRoute: React.FC<{ permission: string }> = ({ permission }) => {
  const { user } = useAuthStore();
  if (!user) return <Navigate to="/login" replace />;
  const allowed = hasPermission(user.role, permission);
  return allowed ? <Outlet /> : <Navigate to="/admin" replace />;
};
