import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">৪০৪</h1>
      <p className="text-sm text-slate-500 mt-2">পেজটি খুঁজে পাওয়া যায়নি।</p>
      <Link to="/" className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg text-xs font-bold">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
};
