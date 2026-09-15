export interface IncompleteOrder {
  id: string;
  customerName?: string;
  customerPhone?: string;
  customerAddress?: string;
  deliveryArea?: string;
  items: any[];
  totalAmount: number;
  createdAt: string;
}

const INCOMPLETE_KEY = 'twbd_incomplete_orders';

export class IncompleteOrderService {
  static async getIncompleteOrders(): Promise<IncompleteOrder[]> {
    const raw = localStorage.getItem(INCOMPLETE_KEY);
    if (!raw) {
      const initial: IncompleteOrder[] = [
        {
          id: 'inc_1',
          customerName: 'Jashim Uddin',
          customerPhone: '01844556677',
          customerAddress: 'Uttara Sector 11, Dhaka',
          deliveryArea: 'Inside Dhaka',
          items: [{ productName: 'Huawei Watch GT 4', quantity: 1, price: 24500 }],
          totalAmount: 24590,
          createdAt: '2026-09-14T08:20:00Z'
        }
      ];
      localStorage.setItem(INCOMPLETE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  }

  static async saveDraft(data: Partial<IncompleteOrder>) {
    const list = await this.getIncompleteOrders();
    const item: IncompleteOrder = {
      id: 'inc_' + Date.now(),
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      customerAddress: data.customerAddress,
      deliveryArea: data.deliveryArea,
      items: data.items || [],
      totalAmount: data.totalAmount || 0,
      createdAt: new Date().toISOString()
    };
    list.unshift(item);
    localStorage.setItem(INCOMPLETE_KEY, JSON.stringify(list.slice(0, 100)));
  }
}
