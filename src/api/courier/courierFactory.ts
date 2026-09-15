import { PathaoCourierApi } from './pathao';
import { SteadfastCourierApi } from './steadfast';
import { RedxCourierApi } from './redx';
import { PaperflyCourierApi } from './paperfly';
import { SundarbanCourierApi } from './sundarban';
import { CourierConsignmentPayload, CourierConsignmentResponse } from '../../types/courier';

export class CourierFactory {
  static async dispatchOrder(courierName: string, payload: CourierConsignmentPayload): Promise<CourierConsignmentResponse> {
    switch (courierName.toLowerCase()) {
      case 'pathao':
        return PathaoCourierApi.createOrder(payload);
      case 'redx':
        return RedxCourierApi.createOrder(payload);
      case 'paperfly':
        return PaperflyCourierApi.createOrder(payload);
      case 'sundarban':
        return SundarbanCourierApi.createOrder(payload);
      case 'steadfast':
      default:
        return SteadfastCourierApi.createOrder(payload);
    }
  }
}
