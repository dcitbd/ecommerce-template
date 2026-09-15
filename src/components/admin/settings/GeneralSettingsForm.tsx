import React, { useState } from 'react';
import { useSettings } from '../../../contexts/SettingsContext';

export const GeneralSettingsForm: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const [form, setForm] = useState(settings);
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4 max-w-2xl">
      <h3 className="text-base font-bold text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
        ওয়েবসাইট ও শপ সেটিংস
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block font-medium mb-1">ওয়েবসাইটের নাম</label>
          <input
            type="text"
            value={form.siteName}
            onChange={(e) => setForm({ ...form, siteName: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-950"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">ট্যাগলাইন / স্লোগান</label>
          <input
            type="text"
            value={form.tagline}
            onChange={(e) => setForm({ ...form, tagline: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-950"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">হেল্পলাইন ফোন</label>
          <input
            type="text"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-950"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">সাপোর্ট ই-মেইল</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-950"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="block font-medium mb-1">হেড অফিস ঠিকানা</label>
          <input
            type="text"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-slate-950"
          />
        </div>
      </div>

      <button
        type="submit"
        className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow transition"
      >
        {saved ? 'সেটিংস সংরক্ষিত হয়েছে!' : 'সেটিংস সংরক্ষণ করুন'}
      </button>
    </form>
  );
};
