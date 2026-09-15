export interface FraudCheckResult {
  phoneNumber: string;
  totalOrders: number;
  successOrders: number;
  cancelOrders: number;
  returnOrders: number;
  successPercentage: number;
  riskBadge: 'Very High Risk' | 'Low Risk' | 'No Risk' | 'Verified' | 'Gold Verified';
  riskScore: number; // 0 - 100
  courierHistory: Array<{ courier: string; status: string; date: string }>;
  recommendation: string;
}
