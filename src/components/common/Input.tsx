import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-3.5 py-2 rounded-lg border text-sm transition-all focus:outline-none focus:ring-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 ${
            error
              ? 'border-rose-500 focus:ring-rose-200'
              : 'border-slate-300 dark:border-slate-700 focus:ring-emerald-500/20 focus:border-emerald-500'
          } ${className}`}
          {...props}
        />
        {error ? (
          <p className="mt-1 text-xs text-rose-500">{error}</p>
        ) : helperText ? (
          <p className="mt-1 text-xs text-slate-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
