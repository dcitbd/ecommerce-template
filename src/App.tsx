import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { SettingsProvider } from './contexts/SettingsContext';
import { ThemeProvider } from './contexts/ThemeContext';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <AuthProvider>
          <NotificationProvider>
            <CartProvider>
              <WishlistProvider>
                <BrowserRouter>
                  <AppRoutes />
                </BrowserRouter>
              </WishlistProvider>
            </CartProvider>
          </NotificationProvider>
        </AuthProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
};
