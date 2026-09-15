import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export const AdminProtectedRoute: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const isAdmin = user && ['super_admin', 'admin', 'manager', 'staff'].includes(user.role);
  return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};
