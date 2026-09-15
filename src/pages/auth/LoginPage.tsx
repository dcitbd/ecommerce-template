import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Lock, Phone, ArrowRight } from 'lucide-react';
import { AuthService } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import { CaptchaWidget } from '../../components/auth/CaptchaWidget';
import { SEO } from '../../seo/SEO';

export const LoginPage: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCaptchaValid) {
      setError('ক্যাপচা সঠিক নয়!');
      return;
    }

    setLoading(true);
    const user = await AuthService.loginWithPhonePassword(phone.trim(), password);
    if (user) {
      setUser(user);
      if (['super_admin', 'admin', 'manager', 'staff'].includes(user.role)) {
        navigate('/admin');
      } else {
        navigate('/customer/dashboard');
      }
    } else {
      setError('ভুল ফোন নম্বর বা পাসওয়ার্ড! এডমিন ডেমোর জন্য ফোন: 01351003958 ব্যবহার করুন।');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <SEO title="লগইন | Techno World BD" />
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl space-y-6">
        <div className="text-center">
          <img src="/logo.svg" alt="Techno World BD" className="h-10 mx-auto mb-2" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">একাউন্টে লগইন করুন</h2>
          <p className="text-xs text-slate-400 mt-1">কাস্টমার ও এডমিন পোর্টাল</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-600 text-xs font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4 text-xs">
          <div>
            <label className="block font-medium mb-1">ফোন নম্বর (১১ ডিজিট)</label>
            <div className="relative">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="01351003958"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 font-mono outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">পাসওয়ার্ড</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>

          {/* Number Captcha */}
          <div>
            <label className="block font-medium mb-1">সংখ্যা ক্যাপচা পূরণ করুন *</label>
            <CaptchaWidget onVerify={setIsCaptchaValid} />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md transition flex items-center justify-center"
          >
            {loading ? 'লগইন হচ্ছে...' : 'লগইন করুন'}
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
          নতুন একাউন্ট করতে চান?{' '}
          <Link to="/register" className="font-bold text-emerald-600 hover:underline">
            রেজিস্ট্রেশন করুন
          </Link>
        </div>
      </div>
    </div>
  );
};
