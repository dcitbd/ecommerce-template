import React from 'react';
import { Truck } from 'lucide-react';

export const CourierConfigSection: React.FC = () => {
  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
      <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
        <Truck className="w-4 h-4 mr-2 text-emerald-600" /> কুরিয়ার API ইন্টিগ্রেশন (Steadfast, Pathao, RedX)
      </h4>
      <p className="text-xs text-slate-500">API Key ও Secret যুক্ত করে স্বয়ংক্রিয় পার্সেল বুকিং সক্রিয় করুন।</p>
    </div>
  );
};
