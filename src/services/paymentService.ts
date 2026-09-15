import { PaymentFactory } from '../api/payment/paymentFactory';
import { PaymentMethod } from '../types/payment';

export class PaymentService {
  static async getPaymentMethods(): Promise<PaymentMethod[]> {
    return [
      { id: 'pm_cod', name: 'ক্যাশ অন ডেলিভারি (Cash on Delivery)', code: 'cod', isOnline: false, isActive: true, description: 'পণ্য হাতে পেয়ে মূল্য পরিশোধ করুন' },
      { id: 'pm_bkash', name: 'বিকাশ (bKash Payment)', code: 'bkash', isOnline: true, isActive: true, description: 'বিকাশ মার্চেন্ট গেটওয়ের মাধ্যমে দ্রুত পেমেন্ট' },
      { id: 'pm_nagad', name: 'নগদ (Nagad Payment)', code: 'nagad', isOnline: true, isActive: true, description: 'নগদ অনলাইন পেমেন্ট' },
      { id: 'pm_rocket', name: 'রকেট (Rocket Payment)', code: 'rocket', isOnline: true, isActive: true, description: 'ডিবিবিএল রকেট ওয়ালেট' },
      { id: 'pm_ssl', name: 'কার্ড ও ইন্টারনেট ব্যাংকিং (SSLCommerz)', code: 'sslcommerz', isOnline: true, isActive: true, description: 'ভিসা, মাস্টারকার্ড ও সকল ব্যাংক কার্ড' }
    ];
  }

  static async processPayment(methodCode: string, orderId: string, amount: number) {
    return PaymentFactory.processPayment(methodCode, orderId, amount);
  }
}
