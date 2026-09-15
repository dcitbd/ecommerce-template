export interface ActivityLog {
  id: string;
  userName: string;
  role: string;
  action: string;
  entity?: string;
  details: string;
  ipAddress?: string;
  createdAt: string;
}
