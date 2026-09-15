import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search, MapPin, Menu, X, Shield, Sun, Moon } from 'lucide-react';
import { TopAnnouncementBar } from './TopAnnouncementBar';
import { SearchBar } from './SearchBar';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useAuthStore } from '../../store/authStore';
import { useTheme } from '../../contexts/ThemeContext';
import { Product } from '../../types/product';

export const Navbar: React.FC<{ products: Product[] }> = ({ products }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const cartItemsCount = useCartStore((s) => s.totalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const { user, isAuthenticated } = useAuthStore();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <TopAnnouncementBar />
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-2 shrink-0">
          <img src="/logo.svg" alt="Techno World BD" className="h-10 w-auto" />
        </Link>

        {/* Live Search Bar with Instant Preview */}
        <div className="hidden md:flex flex-1 justify-center px-4">
          <SearchBar products={products} />
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition"
            title="Toggle Light/Dark Mode"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Track Order */}
          <Link
            to="/track-order"
            className="hidden sm:flex items-center space-x-1 text-xs font-medium text-slate-700 dark:text-slate-200 hover:text-emerald-600 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            <MapPin className="w-4 h-4 text-emerald-500" />
            <span>ট্র্যাক অর্ডার</span>
          </Link>

          {/* Wishlist / Love Page */}
          <Link
            to="/wishlist"
            className="relative p-2 text-slate-700 dark:text-slate-200 hover:text-rose-500 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="পছন্দের তালিকা"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative p-2 text-slate-700 dark:text-slate-200 hover:text-emerald-600 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="শপিং কার্ট"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>

          {/* Customer / Admin Login */}
          {isAuthenticated && user ? (
            <Link
              to={['super_admin', 'admin', 'manager', 'staff'].includes(user.role) ? '/admin' : '/customer/dashboard'}
              className="flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">{user.fullName.split(' ')[0]}</span>
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-1.5 text-xs font-medium px-3 py-1.5 bg-slate-900 dark:bg-slate-800 text-white rounded-full hover:bg-emerald-600 transition shadow-sm"
            >
              <User className="w-4 h-4" />
              <span>লগইন</span>
            </Link>
          )}

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 dark:text-slate-200"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Search & Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="my-3">
            <SearchBar products={products} />
          </div>
          <div className="flex flex-col space-y-2 text-sm font-medium">
            <Link to="/products" className="py-2 border-b border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-200">
              সকল প্রোডাক্টস
            </Link>
            <Link to="/products?orderType=Pre-Order" className="py-2 border-b border-slate-100 dark:border-slate-800 text-amber-500 font-semibold">
              দুবাই প্রি-অর্ডার স্পেশাল
            </Link>
            <Link to="/products?orderType=WholeSale" className="py-2 border-b border-slate-100 dark:border-slate-800 text-emerald-500 font-semibold">
              হোলসেল / পাইকারি অফার
            </Link>
            <Link to="/track-order" className="py-2 text-slate-700 dark:text-slate-200">
              অর্ডার ট্র্যাকিং
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
