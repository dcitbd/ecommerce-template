import { CustomerRecord } from '../types/customer';

const CUSTOMERS_KEY = 'twbd_customers_directory';

export class CustomerService {
  static async getAllCustomers(): Promise<CustomerRecord[]> {
    const raw = localStorage.getItem(CUSTOMERS_KEY);
    if (!raw) {
      const initial: CustomerRecord[] = [
        {
          id: 'c1',
          name: 'Md. Shafiqur Rahman',
          phone: '01711998877',
          email: 'shafiq@gmail.com',
          address: 'Dhanmondi 27, Dhaka',
          district: 'Dhaka',
          totalOrders: 14,
          successOrders: 13,
          cancelOrders: 1,
          successRate: 92.8,
          riskLevel: 'Gold Verified',
          ratingPercentage: 93,
          createdAt: '2026-01-10T00:00:00Z',
          lastOrderAt: '2026-09-10T14:30:00Z'
        },
        {
          id: 'c2',
          name: 'Ashraful Alam',
          phone: '01922334455',
          email: 'ashraf@yahoo.com',
          address: 'Chawkbazar, Chittagong',
          district: 'Chittagong',
          totalOrders: 6,
          successOrders: 4,
          cancelOrders: 2,
          successRate: 66.6,
          riskLevel: 'No Risk',
          ratingPercentage: 67,
          createdAt: '2026-02-15T00:00:00Z',
          lastOrderAt: '2026-09-02T11:20:00Z'
        },
        {
          id: 'c3',
          name: 'Rakibul Islam',
          phone: '01655667788',
          address: 'Zindabazar, Sylhet',
          district: 'Sylhet',
          totalOrders: 4,
          successOrders: 2,
          cancelOrders: 2,
          successRate: 50.0,
          riskLevel: 'Low Risk',
          ratingPercentage: 50,
          createdAt: '2026-03-01T00:00:00Z',
          lastOrderAt: '2026-08-14T18:00:00Z'
        },
        {
          id: 'c4',
          name: 'Suspicious Customer Test',
          phone: '01399887766',
          address: 'Unknown Area',
          district: 'Dhaka',
          totalOrders: 5,
          successOrders: 1,
          cancelOrders: 4,
          successRate: 20.0,
          riskLevel: 'Very High Risk',
          ratingPercentage: 20,
          createdAt: '2026-04-12T00:00:00Z',
          lastOrderAt: '2026-07-29T10:00:00Z'
        }
      ];
      localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  }

  static async recordCustomerOrder(phone: string, name: string, address: string, isSuccess: boolean = true) {
    const list = await this.getAllCustomers();
    const existing = list.find(c => c.phone === phone);
    if (existing) {
      existing.totalOrders += 1;
      if (isSuccess) existing.successOrders += 1;
      else existing.cancelOrders += 1;
      existing.successRate = Math.round((existing.successOrders / existing.totalOrders) * 100);
      existing.ratingPercentage = existing.successRate;
      existing.lastOrderAt = new Date().toISOString();
      if (existing.successRate >= 80) existing.riskLevel = 'Gold Verified';
      else if (existing.successRate >= 70) existing.riskLevel = 'Verified';
      else if (existing.successRate >= 60) existing.riskLevel = 'No Risk';
      else if (existing.successRate >= 50) existing.riskLevel = 'Low Risk';
      else existing.riskLevel = 'Very High Risk';
    } else {
      list.unshift({
        id: 'cust_' + Date.now(),
        name,
        phone,
        address,
        totalOrders: 1,
        successOrders: isSuccess ? 1 : 0,
        cancelOrders: isSuccess ? 0 : 1,
        successRate: isSuccess ? 100 : 0,
        riskLevel: isSuccess ? 'Gold Verified' : 'Low Risk',
        ratingPercentage: isSuccess ? 100 : 0,
        createdAt: new Date().toISOString(),
        lastOrderAt: new Date().toISOString()
      });
    }
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(list));
  }
}
