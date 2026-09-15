import { RoleDefinition } from '../types/role';

export class RoleService {
  static async getRoles(): Promise<RoleDefinition[]> {
    return [
      { id: 'super_admin', name: 'সুপার এডমিন', description: 'সম্পূর্ণ নিয়ন্ত্রণ ও আর্থিক প্রতিবেদন', permissions: ['*'] },
      { id: 'admin', name: 'এডমিন', description: 'পণ্য ও অর্ডার পরিচালনা', permissions: ['products.*', 'orders.*'] },
      { id: 'manager', name: 'ম্যানেজার', description: 'অর্ডার মনিটরিং ও কাস্টমার রিভিউ', permissions: ['orders.view', 'reviews.*'] },
      { id: 'staff', name: 'অপারেটর', description: 'প্যাকেজিং ও কুরিয়ার বুকিং', permissions: ['orders.view', 'orders.status_update'] }
    ];
  }
}
