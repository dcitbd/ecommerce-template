import { ActivityLog } from '../types/activity';

const STORAGE_KEY = 'twbd_activity_logs';

export function logActivity(log: Omit<ActivityLog, 'id' | 'createdAt'>) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const newEntry: ActivityLog = {
      ...log,
      id: 'act_' + Date.now(),
      createdAt: new Date().toISOString()
    };
    existing.unshift(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 500)));
  } catch (err) {
    console.error('Failed to log activity:', err);
  }
}
