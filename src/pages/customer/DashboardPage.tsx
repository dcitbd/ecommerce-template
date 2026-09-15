import React from 'react';
import { ShoppingBag, Heart, CheckCircle2, Clock } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useOrders } from '../../hooks/useOrders';
import { useWishlistStore } from '../../store/wishlistStore';

export const DashboardPage: React.FC = () => {
  const { user } = useAuthStore();
  const { orders } = useOrders(user?.phone);
  const wishlistCount = useWishlistStore((s) => s.items.length);

  const totalSpent = orders.reduce((acc, o) => acc + (o.status !== 'Cancelled' ? o.totalAmount : 0), 0);
  const successOrders = orders.filter((o) => o.status === 'Delivered').length;

  return (
    <div className="space-y-6">
      <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl text-white shadow-lg">
        <h2 className="text-xl sm:text-2xl font-black">
          স্বাগতম, {user?.fullName}!
        </h2>
        <p className="text-xs text-emerald-100 mt-1">
          সদস্যতার বয়স: ১ বছর ২ মাস • সদস্য নম্বর: {user?.phone}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500">মোট অর্ডার</span>
          <p className="text-xl font-black text-slate-900 dark:text-white mt-1">{orders.length} টি</p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500">পছন্দের তালিকা</span>
          <p className="text-xl font-black text-rose-500 mt-1">{wishlistCount} টি</p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500">মোট কেনাকাটা</span>
          <p className="text-xl font-black text-emerald-600 mt-1">৳{totalSpent.toLocaleString()}</p>
        </div>
        <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs text-slate-500">সফল ডেলিভারি</span>
          <p className="text-xl font-black text-sky-600 mt-1">{successOrders} টি</p>
        </div>
      </div>
    </div>
  );
};
