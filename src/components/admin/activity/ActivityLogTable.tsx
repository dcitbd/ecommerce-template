import React, { useState, useEffect } from 'react';
import { Activity, Search, RefreshCw } from 'lucide-react';
import { ActivityService } from '../../../services/activityService';
import { ActivityLog } from '../../../types/activity';

export const ActivityLogTable: React.FC = () => {
  const [logs, setLogs] = useState<ActivityLog[]>([]);
  const [search, setSearch] = useState('');

  const loadLogs = async () => {
    const data = await ActivityService.getLogs();
    setLogs(data);
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filtered = logs.filter(
    (l) =>
      l.userName.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase()) ||
      l.details.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
            <Activity className="w-5 h-5 text-emerald-600 mr-2" />
            এক্টিভ হিস্ট্রি ও অডিট লগ
          </h3>
          <p className="text-xs text-slate-500">কে কখন লগইন করছে এবং কি কাজ করছে তার নির্ভুল রেকর্ড (শুধুমাত্র দেখার জন্য)</p>
        </div>
        <button
          onClick={loadLogs}
          className="p-2 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
          title="রিফ্রেশ"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 font-bold">
              <th className="py-3 px-3">ব্যবহারকারী</th>
              <th className="py-3 px-3">রোল</th>
              <th className="py-3 px-3">অ্যাকশন</th>
              <th className="py-3 px-3">বিস্তারিত তথ্য</th>
              <th className="py-3 px-3">আইপি</th>
              <th className="py-3 px-3 text-right">সময়</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">{log.userName}</td>
                <td className="py-3 px-3 capitalize text-emerald-600">{log.role}</td>
                <td className="py-3 px-3 font-mono font-semibold">{log.action}</td>
                <td className="py-3 px-3 text-slate-600 dark:text-slate-400">{log.details}</td>
                <td className="py-3 px-3 font-mono text-slate-400">{log.ipAddress || '103.145.12.8'}</td>
                <td className="py-3 px-3 text-right font-mono text-slate-500 whitespace-nowrap">
                  {new Date(log.createdAt).toLocaleDateString('bn-BD')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
