import api from '../../api/axios';
import type { Usuario, RefreshTokenResponse } from '../../types/auth.types';

export const authService = {
  loginWithMicrosoft: () => {
    window.location.href = import.meta.env.VITE_OAUTH_LOGIN_URL;
  },

  getCurrentUser: async (): Promise<Usuario> => {
    const { data } = await api.get('/api/auth/me');
    return data;
  },

  refreshToken: async (refreshToken: string): Promise<RefreshTokenResponse> => {
    const { data } = await api.post('/api/auth/refresh', { refreshToken });
    return data;
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/api/auth/logout');
    } finally {
      localStorage.clear();
      window.location.href = '/login';
    }
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('accessToken');
  },
};
