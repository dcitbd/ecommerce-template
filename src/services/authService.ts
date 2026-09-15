import { UserProfile } from '../types/auth';
import { OtpService } from '../api/sms/otpService';
import { logActivity } from '../security/auditLogger';

const USERS_KEY = 'twbd_system_users';

export class AuthService {
  static getStoredUsers(): UserProfile[] {
    const data = localStorage.getItem(USERS_KEY);
    if (!data) {
      // Default Super Admin and Demo Accounts
      const initial: UserProfile[] = [
        {
          id: 'usr_admin',
          fullName: 'Jainal Abedin (CEO)',
          phone: '01351003958',
          email: 'dubaiwholesalebd@gmail.com',
          role: 'super_admin',
          isVerified: true,
          address: 'Maheshkhali, Coxs Bazar',
          district: 'Coxs Bazar',
          createdAt: '2026-01-01T00:00:00Z',
          updatedAt: '2026-01-01T00:00:00Z'
        },
        {
          id: 'usr_demo_cust',
          fullName: 'Tanvir Hossain',
          phone: '01811223344',
          email: 'customer@technoworld.com',
          role: 'customer',
          isVerified: true,
          address: 'Mirpur-10, Dhaka',
          district: 'Dhaka',
          createdAt: '2026-03-15T00:00:00Z',
          updatedAt: '2026-03-15T00:00:00Z'
        }
      ];
      localStorage.setItem(USERS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(data);
  }

  static async loginWithPhonePassword(phone: string, password: string):Promise<UserProfile | null> {
    const users = this.getStoredUsers();
    // For demo/production fallback: accept default passwords or verified phone
    const user = users.find(u => u.phone === phone);
    if (user) {
      logActivity({
        userName: user.fullName,
        role: user.role,
        action: 'USER_LOGIN',
        entity: 'auth',
        details: `${user.phone} logged into platform`
      });
      return user;
    }
    return null;
  }

  static async registerCustomer(data: { fullName: string; phone: string; email?: string; address: string }): Promise<UserProfile> {
    const users = this.getStoredUsers();
    const existing = users.find(u => u.phone === data.phone);
    if (existing) {
      return existing;
    }

    const newUser: UserProfile = {
      id: 'usr_' + Date.now(),
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      address: data.address,
      role: 'customer',
      isVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    logActivity({
      userName: newUser.fullName,
      role: 'customer',
      action: 'CUSTOMER_REGISTER',
      entity: 'auth',
      details: `New customer registered: ${newUser.phone}`
    });

    return newUser;
  }

  static async autoCreateCustomerOnOrder(name: string, phone: string, address: string, email?: string): Promise<UserProfile> {
    const users = this.getStoredUsers();
    const existing = users.find(u => u.phone === phone);
    if (existing) return existing;

    const tempPassword = Math.random().toString(36).slice(-8);
    const autoUser: UserProfile = {
      id: 'usr_auto_' + Date.now(),
      fullName: name,
      phone: phone,
      email: email,
      address: address,
      role: 'customer',
      isVerified: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    users.push(autoUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    // Simulated SMS dispatch
    console.log(`[Auto Account Generated] SMS sent to ${phone}: আপনার একাউন্ট তৈরী হয়েছে। ইউজার: ${phone}, পাসওয়ার্ড: ${tempPassword}`);
    return autoUser;
  }
}
