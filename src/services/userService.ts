import { AdminUser } from '../types/user';

const ADMIN_USERS_KEY = 'twbd_admin_team';

export class UserService {
  static async getUsers(): Promise<AdminUser[]> {
    const raw = localStorage.getItem(ADMIN_USERS_KEY);
    if (!raw) {
      const initial: AdminUser[] = [
        {
          id: 'u1',
          name: 'Jainal Abedin (CEO)',
          email: 'dubaiwholesalebd@gmail.com',
          phone: '01351003958',
          roleId: 'super_admin',
          roleName: 'সুপার এডমিন',
          isActive: true,
          createdAt: '2026-01-01T00:00:00Z'
        },
        {
          id: 'u2',
          name: 'Operations Manager',
          email: 'manager@technoworld.com',
          phone: '01333301363',
          roleId: 'manager',
          roleName: 'ম্যানেজার',
          isActive: true,
          createdAt: '2026-02-01T00:00:00Z'
        }
      ];
      localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  }

  static async saveUser(user: Partial<AdminUser>): Promise<AdminUser> {
    const list = await this.getUsers();
    const newUser: AdminUser = {
      id: user.id || 'u_' + Date.now(),
      name: user.name || 'Staff Member',
      email: user.email || '',
      phone: user.phone || '',
      roleId: user.roleId || 'staff',
      roleName: user.roleName || 'স্টাফ',
      isActive: user.isActive !== false,
      createdAt: new Date().toISOString()
    };
    list.push(newUser);
    localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(list));
    return newUser;
  }
}
