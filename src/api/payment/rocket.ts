export class RocketPaymentApi {
  static async initiatePayment(orderId: string, amount: number) {
    return {
      success: true,
      paymentUrl: `https://rocket.dutchbanglabank.com/pay/${orderId}`,
      transactionId: 'TRX-RK-' + Date.now()
    };
  }
}
