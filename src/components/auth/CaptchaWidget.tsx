import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

interface CaptchaProps {
  onVerify: (isValid: boolean) => void;
}

export const CaptchaWidget: React.FC<CaptchaProps> = ({ onVerify }) => {
  const [num1, setNum1] = useState(3);
  const [num2, setNum2] = useState(5);
  const [userAnswer, setUserAnswer] = useState('');

  const generateCaptcha = () => {
    const n1 = Math.floor(Math.random() * 8) + 1;
    const n2 = Math.floor(Math.random() * 8) + 1;
    setNum1(n1);
    setNum2(n2);
    setUserAnswer('');
    onVerify(false);
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setUserAnswer(val);
    if (parseInt(val, 10) === num1 + num2) {
      onVerify(true);
    } else {
      onVerify(false);
    }
  };

  return (
    <div className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
      <div className="flex items-center space-x-1.5 font-mono font-bold text-sm bg-slate-200 dark:bg-slate-700 px-3 py-1.5 rounded-lg select-none">
        <span>{num1}</span>
        <span>+</span>
        <span>{num2}</span>
        <span>=</span>
        <span>?</span>
      </div>

      <button
        type="button"
        onClick={generateCaptcha}
        className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        title="নতুন ক্যাপচা"
      >
        <RefreshCw className="w-4 h-4" />
      </button>

      <input
        type="number"
        value={userAnswer}
        onChange={handleChange}
        placeholder="উত্তর দিন"
        className="w-24 px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono focus:ring-2 focus:ring-emerald-500 outline-none"
      />
    </div>
  );
};
