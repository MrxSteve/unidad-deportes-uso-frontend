
import api from '../../api/axios';
import type { 
  CarreraResponse, 
  PerfilMeResponse, 
  PerfilUpdateDTO 
} from '../../types/perfil.types';

export const carreraService = {
 
  getCarreras: async (): Promise<CarreraResponse> => {
    const { data } = await api.get<CarreraResponse>('/carreras');
    return data;
  },

  
  getMe: async (): Promise<PerfilMeResponse> => {
    const { data } = await api.get<PerfilMeResponse>('/perfil/me');
    return data;
  },

  
  updateMe: async (perfil: PerfilUpdateDTO): Promise<PerfilMeResponse> => {
    const { data } = await api.put<PerfilMeResponse>('/perfil/me', perfil);
    return data;
  }
};