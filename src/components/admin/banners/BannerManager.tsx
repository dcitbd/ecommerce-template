import React from 'react';
import { Image } from 'lucide-react';
import { BannerItem } from '../../../services/bannerService';

export const BannerManager: React.FC<{ banners: BannerItem[] }> = ({ banners }) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
      <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
        <Image className="w-4 h-4 mr-2 text-emerald-600" /> ব্যানার স্লাইডার কনফিগারেশন ({banners.length})
      </h3>
      <div className="space-y-3">
        {banners.map((b) => (
          <div key={b.id} className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-between text-xs">
            <div>
              <p className="font-bold">{b.title}</p>
              <p className="text-slate-400">{b.subtitle}</p>
            </div>
            <span className="text-emerald-600 font-mono font-bold">ক্রম: #{b.sortOrder}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
