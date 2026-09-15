import React from 'react';

export const InventoryReport: React.FC = () => {
  return (
    <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
      <h3 className="text-base font-bold text-slate-900 dark:text-white">ইনভেন্টরি ও স্টক প্রতিবেদন (Inventory Report)</h3>
      <p className="text-xs text-slate-500 mt-1">স্টক-ইন, স্টক-আউট ও লো-স্টক অ্যালার্ট তালিকা।</p>
    </div>
  );
};
