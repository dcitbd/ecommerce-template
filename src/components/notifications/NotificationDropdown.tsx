import React from 'react';
import { Check, Trash2, Bell } from 'lucide-react';
import { useNotificationStore } from '../../store/notificationStore';

export const NotificationDropdown: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { notifications, markAsRead, clearAll } = useNotificationStore();

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-50 p-4 space-y-3">
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center">
          <Bell className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> নোটিফিকেশন
        </h4>
        {notifications.length > 0 && (
          <button onClick={clearAll} className="text-[10px] text-rose-500 hover:underline">
            সব মুছুন
          </button>
        )}
      </div>

      <div className="max-h-60 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
        {notifications.length === 0 ? (
          <p className="text-center text-xs text-slate-400 py-4">কোন নোটিফিকেশন নেই</p>
        ) : (
          notifications.map((n) => (
            <div key={n.id} className="py-2 text-xs space-y-0.5">
              <div className="flex justify-between items-start">
                <span className="font-bold text-slate-900 dark:text-white">{n.title}</span>
                {!n.isRead && (
                  <button onClick={() => markAsRead(n.id)} title="পঠিত হিসেবে চিহ্নিত করুন">
                    <Check className="w-3 h-3 text-emerald-500" />
                  </button>
                )}
              </div>
              <p className="text-[11px] text-slate-500">{n.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
