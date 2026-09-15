export interface UserProfile {
  id: string;
  userId?: string;
  fullName: string;
  phone: string;
  email?: string;
  avatarUrl?: string;
  address?: string;
  district?: string;
  thana?: string;
  isVerified: boolean;
  role: 'super_admin' | 'admin' | 'manager' | 'staff' | 'customer';
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}
