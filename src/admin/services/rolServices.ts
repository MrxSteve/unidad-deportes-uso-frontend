import api from '../../api/axios';
import type { Rol } from '../../types/roles.types';

export const rolService = {
  /**
   * Obtiene todos los roles disponibles en el sistema
   */
  getRoles: async (): Promise<Rol[]> => {
    const { data } = await api.get<Rol[]>('/admin/roles'); 
    return data;
  },

  // Patch para asignar o remover roles a usuarios
  asignarRol: async (usuarioId: number, rolId: number): Promise<void> => {
    await api.patch(`/admin/roles/asignar/${usuarioId}/${rolId}`);
  },


  removerRol: async (usuarioId: number, rolId: number): Promise<void> => {
    await api.patch(`/admin/roles/remover/${usuarioId}/${rolId}`);
  }
};