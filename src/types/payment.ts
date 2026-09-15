export interface PaymentMethod {
  id: string;
  name: string;
  code: string;
  isOnline: boolean;
  isActive: boolean;
  icon?: string;
  description?: string;
}

export interface PaymentTransaction {
  id: string;
  orderId: string;
  paymentMethod: string;
  transactionId: string;
  amount: number;
  status: 'Pending' | 'Successful' | 'Failed';
  createdAt: string;
}
