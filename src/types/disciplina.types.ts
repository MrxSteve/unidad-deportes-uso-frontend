export interface DisciplinaResponse {
  id: number;
  nombre: string;
  imagenUrl: string | null;
}

export interface CrearDisciplinaConImagenRequest {
  nombre: string;
  imagen?: File;
}

export interface ActualizarDisciplinaConImagenRequest {
  nombre?: string;
  imagen?: File;
}
