export interface CustomerRecord {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  district?: string;
  totalOrders: number;
  successOrders: number;
  cancelOrders: number;
  successRate: number; // 0 - 100
  riskLevel: 'Very High Risk' | 'Low Risk' | 'No Risk' | 'Verified' | 'Gold Verified';
  ratingPercentage: number;
  createdAt: string;
  lastOrderAt?: string;
}
