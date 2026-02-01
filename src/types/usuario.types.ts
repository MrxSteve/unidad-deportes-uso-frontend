import type { Rol } from "./roles.types";

export interface Usuario {
  id: number;
  nombreCompleto: string;
  email: string;
  fotoUrl?: string;
  roles: Rol[];
}


export interface PaginatedResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}

export interface UsuarioParams {
  page: number;
  size: number;
  sortBy: string;
}