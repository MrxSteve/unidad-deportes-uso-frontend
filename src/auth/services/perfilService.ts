
import api from '../../api/axios';
import type { 
  CarreraResponse, 
  PerfilResponse, 
  PerfilUpdateDTO 
} from '../../types/perfil.types';

export const carreraService = {
  /**
   * Obtiene la lista completa de carreras para los select box
   */
  getCarreras: async (): Promise<CarreraResponse> => {
    const { data } = await api.get<CarreraResponse>('/carreras');
    return data;
  },

  /**
   * Obtiene la información del perfil del usuario autenticado
   */
  getMe: async (): Promise<PerfilResponse> => {
    const { data } = await api.get<PerfilResponse>('/perfil/me');
    return data;
  },

  /**
   * Actualiza los datos del perfil del usuario
   */
  updateMe: async (perfil: PerfilUpdateDTO): Promise<PerfilResponse> => {
    const { data } = await api.put<PerfilResponse>('/perfil/me', perfil);
    return data;
  }
};