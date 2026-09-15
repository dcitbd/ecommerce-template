import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
}

export const Select: React.FC<SelectProps> = ({ label, error, options, className = '', ...props }) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          {label}
        </label>
      )}
      <select
        className={`w-full px-3.5 py-2 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 ${
          error
            ? 'border-rose-500 focus:ring-rose-200'
            : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-500/20 focus:border-emerald-500'
        } ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
};
