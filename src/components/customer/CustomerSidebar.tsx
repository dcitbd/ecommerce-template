import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Heart, Settings, LogOut, PackageCheck } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

export const CustomerSidebar: React.FC = () => {
  const location = useLocation();
  const { logout, user } = useAuthStore();

  const links = [
    { to: '/customer/dashboard', label: 'ড্যাশবোর্ড', icon: <LayoutDashboard className="w-4 h-4" /> },
    { to: '/customer/orders', label: 'আমার অর্ডার সমূহ', icon: <ShoppingBag className="w-4 h-4" /> },
    { to: '/wishlist', label: 'পছন্দের তালিকা (Love)', icon: <Heart className="w-4 h-4" /> },
    { to: '/customer/settings', label: 'প্রোফাইল সেটিংস', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm space-y-4">
      {/* User Mini Profile */}
      <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
          {user?.fullName?.charAt(0) || 'U'}
        </div>
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
            {user?.fullName || 'সম্মানিত কাস্টমার'}
          </h4>
          <p className="text-[11px] text-slate-400 font-mono truncate">{user?.phone}</p>
        </div>
      </div>

      <nav className="space-y-1">
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          );
        })}

        <button
          onClick={logout}
          className="w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>লগআউট</span>
        </button>
      </nav>
    </div>
  );
};
