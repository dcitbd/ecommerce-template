import React, { useState, useEffect } from 'react';
import { Users, Search } from 'lucide-react';
import { CustomerService } from '../../../services/customerService';
import { CustomerRecord } from '../../../types/customer';

export const CustomerListTable: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    CustomerService.getAllCustomers().then(setCustomers);
  }, []);

  const filtered = customers.filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.phone.includes(search)
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
          <Users className="w-4 h-4 mr-2 text-emerald-600" /> কাস্টমার ডিরেক্টরি ও ট্রাস্ট রেটিং
        </h3>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="নাম বা ফোন খুঁজুন..."
          className="px-3 py-1.5 border rounded-lg text-xs bg-white dark:bg-slate-950 font-mono"
        />
      </div>

      <div className="overflow-x-auto text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-slate-50 dark:bg-slate-800/40 font-bold">
              <th className="py-2.5 px-3">কাস্টমার নাম</th>
              <th className="py-2.5 px-3">ফোন</th>
              <th className="py-2.5 px-3">মোট অর্ডার</th>
              <th className="py-2.5 px-3">সফল</th>
              <th className="py-2.5 px-3">ক্যানসেল</th>
              <th className="py-2.5 px-3">রেটিং (%)</th>
              <th className="py-2.5 px-3">রিস্ক স্ট্যাটাস</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-2.5 px-3 font-bold">{c.name}</td>
                <td className="py-2.5 px-3 font-mono">{c.phone}</td>
                <td className="py-2.5 px-3 font-mono">{c.totalOrders}</td>
                <td className="py-2.5 px-3 font-mono text-emerald-600">{c.successOrders}</td>
                <td className="py-2.5 px-3 font-mono text-rose-500">{c.cancelOrders}</td>
                <td className="py-2.5 px-3 font-mono font-bold">{c.successRate}%</td>
                <td className="py-2.5 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                    {c.riskLevel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
