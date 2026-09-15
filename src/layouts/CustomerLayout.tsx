import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { Navbar } from '../components/navbar/Navbar';
import { Footer } from '../components/footer/Footer';
import { CustomerSidebar } from '../components/customer/CustomerSidebar';
import { useAuthStore } from '../store/authStore';
import { useProducts } from '../hooks/useProducts';

export const CustomerLayout: React.FC = () => {
  const { user, isAuthenticated } = useAuthStore();
  const { products } = useProducts();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar products={products} />
      <div className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3">
            <CustomerSidebar />
          </div>
          <div className="lg:col-span-9">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
