import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { useCartStore } from '../../store/cartStore';

export const CartSummary: React.FC = () => {
  const { items, totalAmount, totalItems, totalWeight } = useCartStore();

  const subtotal = totalAmount();
  const weight = totalWeight();

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <h3 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
        অর্ডার সামারি
      </h3>

      <div className="space-y-3 my-4 text-xs sm:text-sm">
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>মোট আইটেম ({totalItems()} টি)</span>
          <span className="font-semibold text-slate-900 dark:text-white">৳{subtotal}</span>
        </div>
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>মোট পার্সেল ওজন (আনুমানিক)</span>
          <span className="font-semibold text-slate-900 dark:text-white">{weight.toFixed(2)} কেজি</span>
        </div>
        <div className="flex justify-between text-slate-600 dark:text-slate-400">
          <span>ডেলিভারি চার্জ</span>
          <span className="text-emerald-600 font-semibold">চেকআউটে এলাকা নির্বাচন করুন</span>
        </div>
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between font-bold text-base text-slate-900 dark:text-white">
          <span>সাব-টোটাল</span>
          <span className="text-emerald-600">৳{subtotal}</span>
        </div>
      </div>

      <Link
        to="/checkout"
        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-600/20 flex items-center justify-center transition"
      >
        চেকআউট ও কনফার্ম করুন
        <ArrowRight className="w-4 h-4 ml-2" />
      </Link>

      <div className="mt-4 text-[11px] text-slate-400 flex items-center justify-center space-x-1.5">
        <ShieldCheck className="w-4 h-4 text-emerald-500" />
        <span>১০০% নিরাপদ কেনাকাটা ও ২ সপ্তাহ ওয়ারেন্টি</span>
      </div>
    </div>
  );
};
