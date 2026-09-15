import React, { useState } from 'react';
import { ShieldAlert, Search, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { FraudService } from '../../../services/fraudService';
import { FraudCheckResult } from '../../../types/fraud';

export const FraudCheckTool: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<FraudCheckResult | null>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setLoading(true);
    const data = await FraudService.checkPhone(phone.trim());
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
          <ShieldAlert className="w-5 h-5 text-emerald-600 mr-2" />
          কুরিয়ার ফ্রড ও কাস্টমার ট্রাস্ট স্কোর চেকার
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          কুরিয়ার নেটওয়ার্ক এপিআই (Pathao, Steadfast, RedX) হতে সরাসরি হিস্টোরিকাল ডাটা যাচাই করুন।
        </p>
      </div>

      <form onSubmit={handleCheck} className="flex gap-3 max-w-md">
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="কাস্টমারের ফোন নম্বর দিন (যেমন: 01351003958)"
          className="flex-1 px-3.5 py-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono outline-none focus:ring-2 focus:ring-emerald-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow-md transition disabled:opacity-50"
        >
          {loading ? 'যাচাই হচ্ছে...' : 'চেক করুন'}
        </button>
      </form>

      {result && (
        <div className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-slate-500">নম্বর: {result.phoneNumber}</span>
              <h4 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                সাকসেস রেটিং: {result.successPercentage}%
              </h4>
            </div>
            <span className="px-3 py-1.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400">
              {result.riskBadge}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-500">মোট পার্সেল</span>
              <p className="text-base font-bold font-mono text-slate-800 dark:text-white">{result.totalOrders}</p>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-500">সফল ডেলিভারি</span>
              <p className="text-base font-bold font-mono text-emerald-600">{result.successOrders}</p>
            </div>
            <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              <span className="text-[10px] text-slate-500">বাতিল / রিটার্ন</span>
              <p className="text-base font-bold font-mono text-rose-500">{result.cancelOrders + result.returnOrders}</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300">
            <span className="font-bold">সিস্টেম সুপারিশ: </span>
            {result.recommendation}
          </div>
        </div>
      )}
    </div>
  );
};
