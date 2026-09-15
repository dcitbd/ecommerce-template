import React, { useState } from 'react';
import { useAuthStore } from '../../store/authStore';

export const ProfileSettingsPage: React.FC = () => {
  const { user, setUser } = useAuthStore();
  const [fullName, setFullName] = useState(user?.fullName || '');
  const [address, setAddress] = useState(user?.address || '');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (user) {
      setUser({ ...user, fullName, address });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm max-w-lg space-y-4">
      <h3 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
        প্রোফাইল সেটিংস
      </h3>

      <form onSubmit={handleSave} className="space-y-4 text-xs">
        <div>
          <label className="block font-medium mb-1">আপনার নাম</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-950"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">ফোন নম্বর (পরিবর্তন অযোগ্য)</label>
          <input
            type="text"
            value={user?.phone}
            disabled
            className="w-full px-3 py-2 rounded-xl border bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">ঠিকানা</label>
          <textarea
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border bg-white dark:bg-slate-950"
          />
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-xl"
        >
          {saved ? 'সংরক্ষিত হয়েছে!' : 'আপডেট করুন'}
        </button>
      </form>
    </div>
  );
};
