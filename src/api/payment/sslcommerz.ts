export class SslcommerzPaymentApi {
  static async initiatePayment(orderId: string, amount: number) {
    return {
      success: true,
      paymentUrl: `https://sandbox.sslcommerz.com/gwprocess/v4/api.php?session=${orderId}`,
      transactionId: 'SSL-' + Date.now()
    };
  }
}
