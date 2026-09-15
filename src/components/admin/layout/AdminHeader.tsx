import React from 'react';
import { Menu, Bell, ExternalLink, Sun, Moon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../../contexts/ThemeContext';
import { useNotificationStore } from '../../../store/notificationStore';

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  title: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ onToggleSidebar, title }) => {
  const { theme, toggleTheme } = useTheme();
  const notifications = useNotificationStore((s) => s.notifications);

  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="flex items-center space-x-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
          {title}
        </h1>
      </div>

      <div className="flex items-center space-x-3">
        <Link
          to="/"
          target="_blank"
          className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
        >
          <span>ওয়েবসাইট দেখুন</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={toggleTheme}
          className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="relative p-2 text-slate-600 dark:text-slate-300">
          <Bell className="w-5 h-5" />
          {notifications.length > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
          )}
        </div>
      </div>
    </header>
  );
};
