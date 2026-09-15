import { CourierService } from '../services/courierService';
export const useCourier = () => ({
  dispatchToCourier: CourierService.dispatchToCourier,
  getCouriers: CourierService.getCouriers
});
