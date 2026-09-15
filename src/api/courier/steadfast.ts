import { CourierConsignmentPayload, CourierConsignmentResponse } from '../../types/courier';

export class SteadfastCourierApi {
  static async createOrder(payload: CourierConsignmentPayload): Promise<CourierConsignmentResponse> {
    console.log('[Steadfast API] Dispatching consignment:', payload);
    return {
      success: true,
      consignmentId: 'STF-' + Date.now(),
      trackingCode: 'SF' + Math.floor(100000 + Math.random() * 900000),
      message: 'Steadfast parcel booked'
    };
  }
}
