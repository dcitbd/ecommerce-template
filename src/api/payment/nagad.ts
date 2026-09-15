export class NagadPaymentApi {
  static async initiatePayment(orderId: string, amount: number) {
    return {
      success: true,
      paymentUrl: `https://payment.mynagad.com/pay?invoice=${orderId}`,
      transactionId: 'TRX-NG-' + Date.now()
    };
  }
}
