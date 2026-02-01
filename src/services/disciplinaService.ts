import axios from '../api/axios';
import type { DisciplinaResponse } from '../types/disciplina.types';

const API_BASE = '/disciplinas';

export const disciplinaService = {
  listarDisciplinas: async (): Promise<DisciplinaResponse[]> => {
    const response = await axios.get<DisciplinaResponse[]>(API_BASE);
    return response.data;
  },

  obtenerDisciplinaPorId: async (id: number): Promise<DisciplinaResponse> => {
    const response = await axios.get<DisciplinaResponse>(`${API_BASE}/${id}`);
    return response.data;
  },

  buscarPorNombre: async (nombre: string): Promise<DisciplinaResponse> => {
    const response = await axios.get<DisciplinaResponse>(`${API_BASE}/nombre`, {
      params: { nombre }
    });
    return response.data;
  },

  crearDisciplinaConImagen: async (nombre: string, imagen?: File): Promise<DisciplinaResponse> => {
    const formData = new FormData();
    formData.append('nombre', nombre);
    if (imagen) {
      formData.append('imagen', imagen);
    }

    const response = await axios.post<DisciplinaResponse>(`${API_BASE}/con-imagen`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  actualizarDisciplinaConImagen: async (
    id: number,
    nombre?: string,
    imagen?: File
  ): Promise<DisciplinaResponse> => {
    const formData = new FormData();
    if (nombre) {
      formData.append('nombre', nombre);
    }
    if (imagen) {
      formData.append('imagen', imagen);
    }

    const response = await axios.put<DisciplinaResponse>(
      `${API_BASE}/${id}/con-imagen`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  eliminarDisciplina: async (id: number): Promise<void> => {
    await axios.delete(`${API_BASE}/${id}`);
  },
};
