import api from '../../api/axios';
import type { Usuario, PaginatedResponse, UsuarioParams } from '../../types/usuario.types';

export const usuarioService = {


  getUsuarioById: async (id: number): Promise<Usuario> => {
    const { data } = await api.get<Usuario>(`/usuarios/${id}`);
    return data;
  },
  
  getUsuarios: async ({ page, size, sortBy }: UsuarioParams): Promise<PaginatedResponse<Usuario>> => {
    const { data } = await api.get<PaginatedResponse<Usuario>>('/usuarios', {
      params: { page, size, sortBy }
    });
    return data;
  },

  getContarTodos: async (): Promise<number> => {
    const { data } = await api.get<number>('/usuarios/contar-todos');
    return data;
  },

  getUsuarioByEmail: async (email: string): Promise<Usuario> => {
    const { data } = await api.get<Usuario>('/usuarios/email', {
      params: { email } 
    });
    return data;
  }
};