import type { Usuario } from '../../types/auth.types';

export const ROLES = {
  STUDENT: 'STUDENT',
  MANAGER: 'MANAGER',
  SYSADMIN: 'SYSADMIN',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

export const hasRole = (usuario: Usuario | null, role: Role): boolean => {
  return usuario?.roles.includes(role) || false;
};

export const hasAnyRole = (usuario: Usuario | null, roles: Role[]): boolean => {
  return roles.some(role => hasRole(usuario, role));
};

export const hasMultipleRoles = (usuario: Usuario | null): boolean => {
  return (usuario?.roles.length || 0) > 1;
};

export const getRoleLabel = (role: string): string => {
  const labels: Record<string, string> = {
    STUDENT: 'Estudiante',
    MANAGER: 'Gestor',
    SYSADMIN: 'Administrador del Sistema',
  };
  return labels[role] || role;
};

export const getRoleIcon = (role: string): string => {
  const icons: Record<string, string> = {
    STUDENT: '🎓',
    MANAGER: '👔',
    SYSADMIN: '⚙️',
  };
  return icons[role] || '👤';
};

export const getRoleColor = (role: string): string => {
  const colors: Record<string, string> = {
    STUDENT: 'from-blue-500 to-blue-600',
    MANAGER: 'from-purple-500 to-purple-600',
    SYSADMIN: 'from-red-500 to-red-600',
  };
  return colors[role] || 'from-gray-500 to-gray-600';
};
