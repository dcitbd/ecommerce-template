import { create } from 'zustand';
import { AppNotification } from '../types/notification';

interface NotificationStore {
  notifications: AppNotification[];
  addNotification: (notification: Omit<AppNotification, 'id' | 'createdAt' | 'isRead'>) => void;
  markAsRead: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [
    {
      id: 'n1',
      title: 'দুবাই প্রি-অর্ডার শুরু!',
      message: 'নতুন চালানের ব্র্যান্ডেড গ্যাজেট ১০-১৫ দিনের দ্রুত ডেলিভারিতে প্রি-অর্ডার চলছে।',
      type: 'info',
      isRead: false,
      createdAt: new Date().toISOString()
    }
  ],
  addNotification: (n) =>
    set((state) => ({
      notifications: [
        {
          ...n,
          id: 'notif_' + Date.now(),
          isRead: false,
          createdAt: new Date().toISOString()
        },
        ...state.notifications
      ]
    })),
  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((item) =>
        item.id === id ? { ...item, isRead: true } : item
      )
    })),
  clearAll: () => set({ notifications: [] })
}));
