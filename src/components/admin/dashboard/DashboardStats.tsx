import React from 'react';
import { Package, ShoppingBag, DollarSign, Users, Clock, AlertTriangle } from 'lucide-react';
import { Product } from '../../../types/product';
import { Order } from '../../../types/order';

interface DashboardStatsProps {
  products: Product[];
  orders: Order[];
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ products, orders }) => {
  const totalRevenue = orders.reduce((acc, o) => acc + (o.status !== 'Cancelled' ? o.totalAmount : 0), 0);
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
  const confirmedOrders = orders.filter((o) => ['Confirmed', 'Sent', 'IN-Courier', 'Delivered'].includes(o.status)).length;
  const lowStockCount = products.filter((p) => p.stock < 5).length;

  const cards = [
    { label: 'মোট সেলস রেভিনিউ', value: `৳${totalRevenue.toLocaleString()}`, icon: <DollarSign className="w-5 h-5 text-emerald-500" />, sub: 'সাকসেসফুল ও ডেলিভার্ড' },
    { label: 'মোট সক্রিয় প্রোডাক্ট', value: products.length, icon: <Package className="w-5 h-5 text-sky-500" />, sub: 'ক্যাটালগ আইটেম' },
    { label: 'পেন্ডিং অর্ডার', value: pendingOrders, icon: <Clock className="w-5 h-5 text-amber-500" />, sub: 'অনুমোদনের অপেক্ষায়' },
    { label: 'কনফার্মড / কুরিয়ার অর্ডার', value: confirmedOrders, icon: <ShoppingBag className="w-5 h-5 text-purple-500" />, sub: 'প্রসেসিং সম্পন্ন' },
    { label: 'লো-স্টক অ্যালার্ট', value: lowStockCount, icon: <AlertTriangle className="w-5 h-5 text-rose-500" />, sub: 'স্টক ৫ এর নিচে' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 my-6">
      {cards.map((c, idx) => (
        <div
          key={idx}
          className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-slate-500 font-medium">{c.label}</span>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">{c.icon}</div>
          </div>
          <div className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            {c.value}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">{c.sub}</p>
        </div>
      ))}
    </div>
  );
};
