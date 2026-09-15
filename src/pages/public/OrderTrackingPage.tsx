import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, PackageCheck, Printer } from 'lucide-react';
import { OrderService } from '../../services/orderService';
import { Order } from '../../types/order';
import { VoucherPrintView } from '../../components/order/VoucherPrintView';
import { SEO } from '../../seo/SEO';

export const OrderTrackingPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('orderNumber') || '');
  const [order, setOrder] = useState<Order | null>(null);
  const [searched, setSearched] = useState(false);

  const handleTrack = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;
    setSearched(true);
    const found = await OrderService.getOrderByNumber(query.trim());
    setOrder(found);
  };

  useEffect(() => {
    if (searchParams.get('orderNumber')) {
      handleTrack();
    }
  }, [searchParams]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <SEO title="অর্ডার ট্র্যাকিং ও চালান ভাউচার | Techno World BD" />

      <div className="max-w-xl mx-auto text-center space-y-4 mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          অর্ডার ট্র্যাকিং ও চালান ডাউনলোড
        </h1>
        <p className="text-xs text-slate-500">
          আপনার ইনভয়েস বা অর্ডার নম্বর (যেমন: TWBD-921045-8120) দিয়ে লাইভ স্ট্যাটাস দেখুন।
        </p>

        <form onSubmit={handleTrack} className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="অর্ডার নম্বর লিখুন..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition"
          >
            ট্র্যাক করুন
          </button>
        </form>
      </div>

      {searched && !order && (
        <div className="max-w-md mx-auto p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
          কোন অর্ডার পাওয়া যায়নি। অনুগ্রহ করে সঠিক নম্বর দিন।
        </div>
      )}

      {order && (
        <div className="space-y-8">
          <VoucherPrintView order={order} />
        </div>
      )}
    </div>
  );
};
