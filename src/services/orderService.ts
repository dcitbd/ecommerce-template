import { Order, OrderStatus } from '../types/order';
import { generateOrderNumber } from '../utils/orderNumberGenerator';
import { CustomerService } from './customerService';
import { logActivity } from '../security/auditLogger';

const ORDERS_KEY = 'twbd_orders_data';

export class OrderService {
  static getInitialOrders(): Order[] {
    return [
      {
        id: 'ord_1',
        orderNumber: 'TWBD-921045-8120',
        customerName: 'Md. Shafiqur Rahman',
        customerPhone: '01711998877',
        customerEmail: 'shafiq@gmail.com',
        shippingAddress: 'House 42, Road 27, Dhanmondi, Dhaka',
        deliveryMethod: 'Home Delivery',
        deliveryArea: 'Inside Dhaka',
        orderType: 'Retail',
        totalWeightKg: 0.900,
        items: [
          {
            productId: 'p1',
            productName: 'Huawei Watch GT 4 Pro Smartwatch (Dubai Edition)',
            articleSku: 'HWT-GT4-01',
            unitPrice: 24500,
            quantity: 1,
            totalPrice: 24500,
            color: 'Space Black',
            size: '46mm'
          }
        ],
        subtotal: 24500,
        deliveryCharge: 90,
        discount: 0,
        totalAmount: 24590,
        paymentMethod: 'cod',
        paymentStatus: 'Pending',
        status: 'Confirmed',
        courierName: 'Steadfast',
        courierConsignmentId: 'STF-889123',
        courierTrackingCode: 'SF991024',
        fraudScore: 10,
        fraudRisk: 'Gold Verified',
        createdAt: '2026-09-12T10:30:00Z',
        updatedAt: '2026-09-12T11:00:00Z'
      },
      {
        id: 'ord_2',
        orderNumber: 'TWBD-841920-3341',
        customerName: 'Ashraful Alam',
        customerPhone: '01922334455',
        shippingAddress: 'Shop 12, Chawkbazar Wholesale Market, Chittagong',
        deliveryMethod: 'Home Delivery',
        deliveryArea: 'Outside Dhaka',
        orderType: 'WholeSale',
        totalWeightKg: 8.500,
        items: [
          {
            productId: 'p5',
            productName: 'Techno Ultra Long-Range Zoom Rechargeable LED Torch (1500m)',
            articleSku: 'TW-TORCH-PRO-X9',
            unitPrice: 1950,
            quantity: 10,
            totalPrice: 19500,
            color: 'Space Black',
            size: 'Mega Kit'
          }
        ],
        subtotal: 19500,
        deliveryCharge: 290, // 130 + 8*20 = 290
        discount: 500,
        totalAmount: 19290,
        paymentMethod: 'bkash',
        paymentStatus: 'Paid',
        status: 'Sent',
        courierName: 'Pathao',
        courierConsignmentId: 'PT-112233',
        courierTrackingCode: 'PT883399',
        fraudScore: 30,
        fraudRisk: 'No Risk',
        createdAt: '2026-09-13T14:15:00Z',
        updatedAt: '2026-09-13T16:00:00Z'
      },
      {
        id: 'ord_3',
        orderNumber: 'TWBD-710492-5561',
        customerName: 'Kazi Farhan',
        customerPhone: '01833445566',
        shippingAddress: 'Direct Collect from Maheshkhali Main Hub',
        deliveryMethod: 'Collect from Office',
        deliveryArea: 'Outside Dhaka',
        orderType: 'Pre-Order',
        totalWeightKg: 2.200,
        items: [
          {
            productId: 'p8',
            productName: 'Dubai Pre-Order: High-End Custom OLED Laptop',
            articleSku: 'DB-SPEC-LAP-01',
            unitPrice: 139000,
            quantity: 1,
            totalPrice: 139000
          }
        ],
        subtotal: 139000,
        deliveryCharge: 0,
        discount: 0,
        totalAmount: 139000,
        paymentMethod: 'sslcommerz',
        paymentStatus: 'Paid',
        status: 'Accepted',
        fraudScore: 15,
        fraudRisk: 'Gold Verified',
        createdAt: '2026-09-14T09:00:00Z',
        updatedAt: '2026-09-14T10:00:00Z'
      }
    ];
  }

  static async getAllOrders(): Promise<Order[]> {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) {
      const initial = this.getInitialOrders();
      localStorage.setItem(ORDERS_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  }

  static async getOrdersByPhone(phone: string): Promise<Order[]> {
    const orders = await this.getAllOrders();
    const clean = phone.replace(/[^0-9]/g, '');
    return orders.filter(o => o.customerPhone.replace(/[^0-9]/g, '') === clean);
  }

  static async getOrderByNumber(orderNumber: string): Promise<Order | null> {
    const orders = await this.getAllOrders();
    return orders.find(o => o.orderNumber.toLowerCase() === orderNumber.toLowerCase().trim()) || null;
  }

  static async createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>): Promise<Order> {
    const orders = await this.getAllOrders();
    const newOrder: Order = {
      ...orderData,
      id: 'ord_' + Date.now(),
      orderNumber: generateOrderNumber(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    orders.unshift(newOrder);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

    // Update customer directory
    await CustomerService.recordCustomerOrder(newOrder.customerPhone, newOrder.customerName, newOrder.shippingAddress);

    logActivity({
      userName: newOrder.customerName,
      role: 'customer',
      action: 'ORDER_PLACED',
      entity: newOrder.orderNumber,
      details: `New order ${newOrder.orderNumber} placed for ${newOrder.totalAmount} BDT`
    });

    return newOrder;
  }

  static async updateOrderStatus(orderId: string, newStatus: OrderStatus): Promise<boolean> {
    const orders = await this.getAllOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      order.updatedAt = new Date().toISOString();
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
      logActivity({
        userName: 'Admin',
        role: 'admin',
        action: 'ORDER_STATUS_CHANGE',
        entity: order.orderNumber,
        details: `Order status set to ${newStatus}`
      });
      return true;
    }
    return false;
  }

  static async cancelOrder(orderId: string, reason?: string): Promise<boolean> {
    return this.updateOrderStatus(orderId, 'Cancelled');
  }
}
