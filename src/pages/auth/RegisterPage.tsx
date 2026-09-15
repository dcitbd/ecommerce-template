import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import { CaptchaWidget } from '../../components/auth/CaptchaWidget';
import { SEO } from '../../seo/SEO';

export const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [error, setError] = useState('');

  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCaptchaValid) {
      setError('ক্যাপচা সঠিক হয়নি!');
      return;
    }

    try {
      const user = await AuthService.registerCustomer({
        fullName,
        phone,
        email,
        address
      });
      setUser(user);
      navigate('/customer/dashboard');
    } catch {
      setError('রেজিস্ট্রেশনে ত্রুটি হয়েছে!');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <SEO title="কাস্টমার রেজিস্ট্রেশন | Techno World BD" />
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl space-y-6">
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">নতুন কাস্টমার একাউন্ট</h2>
          <p className="text-xs text-slate-400 mt-1">সহজ ও দ্রুত রেজিস্ট্রেশন</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 text-rose-600 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium mb-1">আপনার নাম *</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="যেমন: তানভীর আহমেদ"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">মোবাইল নম্বর (১১ ডিজিট) *</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="01811223344"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">ই-মেইল (ঐচ্ছিক)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="customer@example.com"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">বিস্তারিত ঠিকানা *</label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="বাসা, রোড, এলাকা ও জেলা"
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">সংখ্যা ক্যাপচা *</label>
            <CaptchaWidget onVerify={setIsCaptchaValid} />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition"
          >
            একাউন্ট তৈরি করুন
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
          আগে থেকেই একাউন্ট আছে?{' '}
          <Link to="/login" className="font-bold text-emerald-600 hover:underline">
            লগইন করুন
          </Link>
        </div>
      </div>
    </div>
  );
};
