import { PaymentService } from '../services/paymentService';
export const usePayment = () => ({
  processPayment: PaymentService.processPayment,
  getMethods: PaymentService.getPaymentMethods
});
