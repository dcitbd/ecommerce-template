import { CourierFactory } from '../api/courier/courierFactory';
import { CourierConsignmentPayload, CourierConsignmentResponse, CourierPartner } from '../types/courier';

export class CourierService {
  static async getCouriers(): Promise<CourierPartner[]> {
    return [
      { id: 'c_stf', name: 'Steadfast Courier', code: 'steadfast', isActive: true },
      { id: 'c_pth', name: 'Pathao Courier', code: 'pathao', isActive: true },
      { id: 'c_rdx', name: 'RedX Delivery', code: 'redx', isActive: true },
      { id: 'c_ppf', name: 'Paperfly Express', code: 'paperfly', isActive: true },
      { id: 'c_sbn', name: 'Sundarban Courier Service', code: 'sundarban', isActive: true }
    ];
  }

  static async dispatchToCourier(courierCode: string, payload: CourierConsignmentPayload): Promise<CourierConsignmentResponse> {
    return CourierFactory.dispatchOrder(courierCode, payload);
  }
}
