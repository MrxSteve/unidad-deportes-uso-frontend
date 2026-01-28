export interface Usuario {
  id: number;
  email: string;
  nombreCompleto: string;
  fotoUrl: string | null;
  roles: string[];
  perfilCompleto: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  usuario: Usuario;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
}
