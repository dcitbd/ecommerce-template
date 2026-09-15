import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { CustomerLayout } from '../layouts/CustomerLayout';
import { AdminLayout } from '../layouts/AdminLayout';

import { HomePage } from '../pages/public/HomePage';
import { ProductsPage } from '../pages/public/ProductsPage';
import { ProductDetailsPage } from '../pages/public/ProductDetailsPage';
import { CartPage } from '../pages/public/CartPage';
import { WishlistPage } from '../pages/public/WishlistPage';
import { CheckoutPage } from '../pages/public/CheckoutPage';
import { OrderTrackingPage } from '../pages/public/OrderTrackingPage';

import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';

import { DashboardPage } from '../pages/customer/DashboardPage';
import { MyOrdersPage } from '../pages/customer/MyOrdersPage';
import { ProfileSettingsPage } from '../pages/customer/ProfileSettingsPage';

import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { NotFoundPage } from '../pages/errors/NotFoundPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="product/:slug" element={<ProductDetailsPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="wishlist" element={<WishlistPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="track-order" element={<OrderTrackingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      {/* Customer Pages */}
      <Route path="/customer" element={<CustomerLayout />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="orders" element={<MyOrdersPage />} />
        <Route path="settings" element={<ProfileSettingsPage />} />
      </Route>

      {/* Admin Panel */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
