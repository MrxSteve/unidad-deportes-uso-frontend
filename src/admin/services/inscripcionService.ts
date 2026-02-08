import api from '../../api/axios';
import type { InscripcionRequest, InscripcionResponse } from '../../types/inscripcion.types';

export const inscripcionService = {
  inscribirUsuario: async (datos: InscripcionRequest): Promise<InscripcionResponse> => {
    const { data } = await api.post<InscripcionResponse>('/inscripciones', datos);
    return data;
  },

  inscribirseComoEstudiante: async (disciplinaId: number): Promise<InscripcionResponse> => {
    const { data } = await api.post<InscripcionResponse>(`/inscripciones/inscribirme/${disciplinaId}`);
    return data;
  },
  getMisInscripciones: async (): Promise<InscripcionResponse[]> => {
    const { data } = await api.get<InscripcionResponse[]>('/inscripciones/mis-inscripciones');
    return data;
  }
};