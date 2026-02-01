import { create } from 'zustand';
import type { Usuario } from '../types/auth.types';

interface AuthState {
  usuario: Usuario | null;
  isLoading: boolean;
  activeRole: string | null;
  setUsuario: (usuario: Usuario | null) => void;
  setLoading: (loading: boolean) => void;
  setActiveRole: (role: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  usuario: null,
  isLoading: true,
  activeRole: null,
  setUsuario: (usuario) => {
    const defaultRole = usuario?.roles?.[0] || null;
    set({ usuario, isLoading: false, activeRole: defaultRole });
  },
  setLoading: (loading) => set({ isLoading: loading }),
  setActiveRole: (role) => set({ activeRole: role }),
  clearAuth: () => set({ usuario: null, isLoading: false, activeRole: null }),
}));
