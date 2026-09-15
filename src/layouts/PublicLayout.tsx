import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/navbar/Navbar';
import { Footer } from '../components/footer/Footer';
import { useProducts } from '../hooks/useProducts';

export const PublicLayout: React.FC = () => {
  const { products } = useProducts();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar products={products} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
