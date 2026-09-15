import React, { createContext, useContext } from 'react';
import { useNotificationStore } from '../store/notificationStore';

const NotificationContext = createContext<ReturnType<typeof useNotificationStore> | null>(null);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const notif = useNotificationStore();
  return <NotificationContext.Provider value={notif}>{children}</NotificationContext.Provider>;
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) return useNotificationStore();
  return context;
};
