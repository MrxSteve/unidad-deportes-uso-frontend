import type { Usuario } from "./usuario.types";
import type { DisciplinaResponse } from "./disciplina.types";

export interface InscripcionRequest {
  usuarioId: Usuario;    
  disciplinaId: DisciplinaResponse; 
}

export interface InscripcionResponse {
  id: number;
  usuarioId: number;
  usuarioNombreCompleto: string;
  usuarioEmail: string;
  usuarioFotoUrl: string | null;
  disciplinaId: number;
  disciplinaNombre: string;
  disciplinaImagenUrl: string | null;
  esSeleccion: boolean;
  fechaInscripcion: string; 
  activo: boolean;
}