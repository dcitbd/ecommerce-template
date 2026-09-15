import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, Heart, ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useWishlistStore } from '../../store/wishlistStore';
import { useAuthStore } from '../../store/authStore';

export const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const cartCount = useCartStore((s) => s.totalItems());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const { user, isAuthenticated } = useAuthStore();

  const navItems = [
    { to: '/', label: 'হোম', icon: <Home className="w-5 h-5" /> },
    { to: '/products', label: 'শপ', icon: <Grid className="w-5 h-5" /> },
    { to: '/wishlist', label: 'লাভ', icon: <Heart className="w-5 h-5" />, badge: wishlistCount },
    { to: '/cart', label: 'কার্ট', icon: <ShoppingBag className="w-5 h-5" />, badge: cartCount },
    {
      to: isAuthenticated ? (user && ['super_admin', 'admin', 'manager', 'staff'].includes(user.role) ? '/admin' : '/customer/dashboard') : '/login',
      label: 'একাউন্ট',
      icon: <User className="w-5 h-5" />
    }
  ];

  return (
    <nav className="mobile-nav-bar md:hidden flex justify-around items-center h-16 border-t border-slate-800 px-2 shadow-2xl">
      {navItems.map((item) => {
        const isActive = location.pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={`flex flex-col items-center justify-center flex-1 relative ${
              isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {item.icon}
            {item.badge ? (
              <span className="absolute top-0 right-4 bg-rose-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                {item.badge}
              </span>
            ) : null}
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
