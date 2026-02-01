// Carrera Types

export interface Carrera {
  id: number;
  codigo: string;
  nombre: string;
}

export type CarreraResponse = Carrera[];

export interface CarreraRequest {
  codigo: string;
  nombre: string;
}

//Perfil Types

export interface Perfil {
  expediente: string;
  codigo: string;
  telefono: string;
  genero: 'M' | 'F' | 'OTRO';
  fechaNacimiento: string; 
  carreraId: number;
}

// Response 
export interface PerfilResponse extends Perfil {
  id?: number; 
  email?: string;
}

// Request 
export interface PerfilUpdateDTO {
  expediente: string;
  codigo: string;
  telefono: string;
  genero: string;
  fechaNacimiento: string;
  carreraId: number;
}