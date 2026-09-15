import React from 'react';
import { Route } from 'react-router-dom';
import { HomePage } from '../pages/public/HomePage';
import { ProductsPage } from '../pages/public/ProductsPage';
import { ProductDetailsPage } from '../pages/public/ProductDetailsPage';
import { CartPage } from '../pages/public/CartPage';
import { WishlistPage } from '../pages/public/WishlistPage';
import { CheckoutPage } from '../pages/public/CheckoutPage';
import { OrderTrackingPage } from '../pages/public/OrderTrackingPage';

export const publicRoutes = (
  <>
    <Route index element={<HomePage />} />
    <Route path="products" element={<ProductsPage />} />
    <Route path="product/:slug" element={<ProductDetailsPage />} />
    <Route path="cart" element={<CartPage />} />
    <Route path="wishlist" element={<WishlistPage />} />
    <Route path="checkout" element={<CheckoutPage />} />
    <Route path="track-order" element={<OrderTrackingPage />} />
  </>
);
