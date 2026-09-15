import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { ReturnOrderService, ReturnOrderRecord } from '../../../services/returnOrderService';

export const ReturnOrdersTable: React.FC = () => {
  const [returns, setReturns] = useState<ReturnOrderRecord[]>([]);

  useEffect(() => {
    ReturnOrderService.getReturnOrders().then(setReturns);
  }, []);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
      <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
        <RotateCcw className="w-4 h-4 mr-2 text-rose-500" /> রিটার্ন অর্ডার সমূহ ({returns.length})
      </h3>
      <div className="overflow-x-auto text-xs">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-slate-50 dark:bg-slate-800/40">
              <th className="py-2 px-3">অর্ডার নম্বর</th>
              <th className="py-2 px-3">কাস্টমার</th>
              <th className="py-2 px-3">কারণ</th>
              <th className="py-2 px-3">রিফান্ড মূল্য</th>
              <th className="py-2 px-3">স্ট্যাটাস</th>
            </tr>
          </thead>
          <tbody>
            {returns.map((ret) => (
              <tr key={ret.id} className="border-b">
                <td className="py-2 px-3 font-mono font-bold text-emerald-600">{ret.orderNumber}</td>
                <td className="py-2 px-3">{ret.customerName} ({ret.customerPhone})</td>
                <td className="py-2 px-3">{ret.reason}</td>
                <td className="py-2 px-3 font-mono font-bold">৳{ret.refundAmount}</td>
                <td className="py-2 px-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-800">
                    {ret.status}
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
