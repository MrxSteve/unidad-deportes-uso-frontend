export interface Rol {
  id: number;
  nombre: string;
}

export type RolResponse = Rol[];


export interface RolActionParams {
  usuarioId: number;
  rolId: number;
}