import { OrderType } from './product';

export type OrderStatus =
  | 'Pending'
  | 'Accepted'
  | 'Confirmed'
  | 'Sent'
  | 'IN-Courier'
  | 'Delivered'
  | 'Cancelled'
  | 'Returned';

export type PaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded';
export type DeliveryMethod = 'Home Delivery' | 'Collect from Office' | 'From Collection Point';
export type DeliveryArea = 'Inside Dhaka' | 'Outside Dhaka';

export interface OrderItem {
  productId: string;
  productName: string;
  articleSku: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
  color?: string;
  size?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  shippingAddress: string;
  deliveryMethod: DeliveryMethod;
  deliveryArea: DeliveryArea;
  orderType: OrderType;
  totalWeightKg: number;
  items: OrderItem[];
  subtotal: number;
  deliveryCharge: number;
  discount: number;
  totalAmount: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  courierName?: string;
  courierConsignmentId?: string;
  courierTrackingCode?: string;
  fraudScore?: number;
  fraudRisk?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}
