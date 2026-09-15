import React from 'react';
import { Link } from 'react-router-dom';

export const UnauthorizedPage: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-3xl font-bold text-rose-600">অননুমোদিত এক্সেস (Unauthorized)</h1>
      <p className="text-xs text-slate-500 mt-2">আপনার এই সেকশনে প্রবেশের অনুমতি নেই।</p>
      <Link to="/" className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs rounded-lg font-bold">
        হোমে যান
      </Link>
    </div>
  );
};
