
import api from '../../api/axios'; 

export const reporteService = {
  getContarManagers: async (): Promise<number> => {
    const { data } = await api.get<number>('/usuarios/contar-managers'); 
    return data; 
  },

  getContarEstudiantes: async (): Promise<number> => {
    const { data } = await api.get<number>('/usuarios/contar-estudiantes'); 
    return data; 
  }
};