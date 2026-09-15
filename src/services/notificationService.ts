import { AppNotification } from '../types/notification';

export class NotificationService {
  static async getNotifications(): Promise<AppNotification[]> {
    return [
      {
        id: 'n1',
        title: 'নতুন অর্ডার এসেছে!',
        message: 'অর্ডার #TWBD-921045 সফলভাবে গ্রহণ করা হয়েছে।',
        type: 'success',
        isRead: false,
        createdAt: new Date().toISOString()
      }
    ];
  }
}
