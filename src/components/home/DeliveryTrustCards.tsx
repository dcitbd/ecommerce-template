import React from 'react';
import { ShieldCheck, Truck, RefreshCw, Zap, Award, CheckCircle } from 'lucide-react';

export const DeliveryTrustCards: React.FC = () => {
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      title: 'সরাসরি আন্তর্জাতিক সোর্স',
      desc: 'Dubai / Hong Kong / Russia থেকে ফ্রেশ ইনটেক পণ্য।'
    },
    {
      icon: <Truck className="w-6 h-6 text-sky-500" />,
      title: 'দ্রুত ডেলিভারি নেটওয়ার্ক',
      desc: 'সারা দেশে ক্যাশ অন ডেলিভারি ও দ্রুত পার্সেল পরিবহন।'
    },
    {
      icon: <RefreshCw className="w-6 h-6 text-amber-500" />,
      title: '২ সপ্তাহ রিপ্লেসমেন্ট গ্যারান্টি',
      desc: 'পণ্য পাওয়ার পর নিশ্চিন্তে যাচাই করার পূর্ণ স্বাধীনতা।'
    },
    {
      icon: <Zap className="w-6 h-6 text-purple-500" />,
      title: 'হোলসেল ও বিটুইবি সুবিধা',
      desc: 'নূন্যতম ১০ পিসে আকর্ষণীয় পাইকারি মূল্য তালিকা।'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 my-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition"
          >
            <div className="p-3 bg-slate-50 dark:bg-slate-800 w-fit rounded-xl mb-3">
              {item.icon}
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
              {item.title}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
