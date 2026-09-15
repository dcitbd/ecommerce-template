import { FraudService } from '../services/fraudService';
export const useFraud = () => ({
  checkCustomer: FraudService.checkPhone
});
