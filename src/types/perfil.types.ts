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
export interface PerfilMeResponse {
  id?: number;
  expediente: string;
  codigo: string;
  telefono: string;
  genero: string;
  fechaNacimiento: string;
  carrera: Carrera;
  email?: string;
}

export interface PerfilUpdateDTO {
  expediente: string;
  codigo: string;
  telefono: string;
  genero: string;
  fechaNacimiento: string;
  carreraId: number;
}