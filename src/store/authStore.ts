import { create } from 'zustand';
import { UserProfile } from '../types/auth';

interface AuthStore {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: UserProfile | null, token?: string) => void;
  logout: () => void;
}

const savedUser = localStorage.getItem('twbd_auth_user');

export const useAuthStore = create<AuthStore>((set) => ({
  user: savedUser ? JSON.parse(savedUser) : null,
  token: localStorage.getItem('twbd_auth_token') || null,
  isAuthenticated: !!savedUser,
  setUser: (user, token) => {
    if (user) {
      localStorage.setItem('twbd_auth_user', JSON.stringify(user));
      if (token) localStorage.setItem('twbd_auth_token', token);
      set({ user, token: token || null, isAuthenticated: true });
    } else {
      localStorage.removeItem('twbd_auth_user');
      localStorage.removeItem('twbd_auth_token');
      set({ user: null, token: null, isAuthenticated: false });
    }
  },
  logout: () => {
    localStorage.removeItem('twbd_auth_user');
    localStorage.removeItem('twbd_auth_token');
    set({ user: null, token: null, isAuthenticated: false });
  }
}));
