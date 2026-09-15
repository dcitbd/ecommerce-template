export interface ReturnOrderRecord {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  reason: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Refunded';
  refundAmount: number;
  createdAt: string;
}

const RETURNS_KEY = 'twbd_return_orders';

export class ReturnOrderService {
  static async getReturnOrders(): Promise<ReturnOrderRecord[]> {
    const raw = localStorage.getItem(RETURNS_KEY);
    if (!raw) {
      const initial: ReturnOrderRecord[] = [
        {
          id: 'ret_1',
          orderNumber: 'TWBD-610992-1029',
          customerName: 'Monirul Hasan',
          customerPhone: '01722331100',
          reason: 'কালার মিসম্যাচ ও সাইজ পরিবর্তন চাই',
          status: 'Pending',
          refundAmount: 24500,
          createdAt: '2026-09-11T12:00:00Z'
        }
      ];
      localStorage.setItem(RETURNS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  }
}
