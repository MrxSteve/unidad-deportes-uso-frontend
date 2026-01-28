import { create } from 'zustand';
import type { Usuario } from '../types/auth.types';

interface AuthState {
  usuario: Usuario | null;
  isLoading: boolean;
  setUsuario: (usuario: Usuario | null) => void;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  usuario: null,
  isLoading: true,
  setUsuario: (usuario) => set({ usuario, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
  clearAuth: () => set({ usuario: null, isLoading: false }),
}));
