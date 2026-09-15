import { ActivityLog } from '../types/activity';

const STORAGE_KEY = 'twbd_activity_logs';

export class ActivityService {
  static async getLogs(): Promise<ActivityLog[]> {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial: ActivityLog[] = [
        {
          id: 'act_init_1',
          userName: 'Jainal Abedin (CEO)',
          role: 'super_admin',
          action: 'SYSTEM_BOOT',
          entity: 'System',
          details: 'Techno World BD omni-channel platform initialized.',
          ipAddress: '103.145.12.8',
          createdAt: '2026-09-15T06:00:00Z'
        },
        {
          id: 'act_init_2',
          userName: 'Jainal Abedin (CEO)',
          role: 'super_admin',
          action: 'CATALOG_SYNC',
          entity: 'Products',
          details: 'Initial batch of 200+ gadget catalogue synchronized with wholesale pricing tiers.',
          ipAddress: '103.145.12.8',
          createdAt: '2026-09-15T07:30:00Z'
        }
      ];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  }
}
