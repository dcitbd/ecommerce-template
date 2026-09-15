import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import { IncompleteOrderService, IncompleteOrder } from '../../../services/incompleteOrderService';

export const IncompleteOrderTable: React.FC = () => {
  const [incompletes, setIncompletes] = useState<IncompleteOrder[]>([]);

  useEffect(() => {
    IncompleteOrderService.getIncompleteOrders().then(setIncompletes);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
      <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
        <Clock className="w-4 h-4 mr-2 text-amber-500" /> ইনকমপ্লিট / পরিত্যক্ত অর্ডার সমূহ ({incompletes.length})
      </h3>
      <div className="overflow-x-auto text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-slate-50 dark:bg-slate-800/40">
              <th className="py-2 px-3">নাম</th>
              <th className="py-2 px-3">মোবাইল</th>
              <th className="py-2 px-3">ঠিকানা</th>
              <th className="py-2 px-3 text-right">অ্যাকশন</th>
            </tr>
          </thead>
          <tbody>
            {incompletes.map((inc) => (
              <tr key={inc.id} className="border-b">
                <td className="py-2 px-3 font-bold">{inc.customerName || 'N/A'}</td>
                <td className="py-2 px-3 font-mono">{inc.customerPhone || 'N/A'}</td>
                <td className="py-2 px-3">{inc.customerAddress || 'N/A'}</td>
                <td className="py-2 px-3 text-right">
                  <button className="px-2.5 py-1 bg-emerald-600 text-white rounded text-[11px] font-bold">
                    সেন্ড ইন অর্ডার লিস্ট
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
