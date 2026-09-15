export class BkashPaymentApi {
  static async initiatePayment(orderId: string, amount: number) {
    return {
      success: true,
      paymentUrl: `https://sandbox.payment.bkash.com/checkout?paymentID=BK-${orderId}`,
      transactionId: 'TRX-BK-' + Date.now()
    };
  }
}
