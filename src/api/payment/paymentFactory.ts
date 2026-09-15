import { BkashPaymentApi } from './bkash';
import { NagadPaymentApi } from './nagad';
import { RocketPaymentApi } from './rocket';
import { SslcommerzPaymentApi } from './sslcommerz';

export class PaymentFactory {
  static async processPayment(methodCode: string, orderId: string, amount: number) {
    switch (methodCode.toLowerCase()) {
      case 'bkash':
        return BkashPaymentApi.initiatePayment(orderId, amount);
      case 'nagad':
        return NagadPaymentApi.initiatePayment(orderId, amount);
      case 'rocket':
        return RocketPaymentApi.initiatePayment(orderId, amount);
      case 'sslcommerz':
        return SslcommerzPaymentApi.initiatePayment(orderId, amount);
      default:
        return { success: true, transactionId: 'COD-' + Date.now(), paymentUrl: null };
    }
  }
}
