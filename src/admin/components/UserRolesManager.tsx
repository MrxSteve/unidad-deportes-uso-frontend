import { useState, useEffect } from 'react';
import { rolService } from '../services/rolServices'; 
import type { Rol } from '../../types/roles.types';
import { RolBadge } from './RolBadge';
import { RolSelector } from './RolSelector';
import { showSuccessAlert, showErrorAlert, showConfirmDialog } from '../../shared/utils/alerts';

interface Props {
  usuarioId: number;
  rolesActuales: (Rol | string)[]; // Soporta el formato string de la API
}

export const UserRolesManager = ({ usuarioId, rolesActuales: iniciales }: Props) => {
  const [rolesUser, setRolesUser] = useState<(Rol | string)[]>(iniciales);
  const [catalogo, setCatalogo] = useState<Rol[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setRolesUser(iniciales);
  }, [usuarioId, iniciales]);

  useEffect(() => {
    // Si da Error 500, el catch evitará que la app se rompa
    rolService.getRoles()
      .then(setCatalogo)
      .catch(() => {
        console.error("Error 500: No se pudo cargar el catálogo de roles.");
      });
  }, []);

  const handleAssign = async (rolId: number) => {
    setLoading(true);
    try {
      await rolService.asignarRol(usuarioId, rolId);
      const nuevo = catalogo.find(r => r.id === rolId);
      if (nuevo) setRolesUser(prev => [...prev, nuevo]);
      showSuccessAlert("Rol asignado");
    } catch {
      showErrorAlert("Error", "No se pudo asignar el rol.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (identifier: number | string) => {
    // Si recibimos un nombre (string), buscamos su ID en el catálogo
    const rolId = typeof identifier === 'string' 
      ? catalogo.find(r => r.nombre === identifier)?.id 
      : identifier;

    if (!rolId) return showErrorAlert("Error", "No se puede eliminar: ID de rol no encontrado.");

    const confirm = await showConfirmDialog("¿Remover?", "El usuario perderá este permiso.");
    if (!confirm) return;

    setLoading(true);
    try {
      await rolService.removerRol(usuarioId, rolId);
      setRolesUser(prev => prev.filter(r => {
        const currentId = typeof r === 'string' ? catalogo.find(c => c.nombre === r)?.id : r.id;
        return currentId !== rolId;
      }));
      showSuccessAlert("Rol removido");
    } catch {
      showErrorAlert("Error", "No se pudo remover el rol.");
    } finally {
      setLoading(false);
    }
  };

  const disponibles = catalogo.filter(cat => 
    !rolesUser.some(ur => (typeof ur === 'string' ? ur === cat.nombre : ur.id === cat.id))
  );

  return (
    <div className="flex flex-wrap items-center gap-3 p-3 bg-neutral-50/50 rounded-2xl border border-neutral-100 min-h-[64px]">
      <div className="flex flex-wrap gap-2">
        {rolesUser.map((rol, index) => (
          <RolBadge 
            key={index} // Usamos index para evitar errores de duplicados si fallan los IDs
            rol={rol} 
            onRemove={handleRemove} 
            isLoading={loading} 
          />
        ))}
      </div>
      {/* El selector solo se muestra si el catálogo cargó (No hubo error 500) */}
      {disponibles.length > 0 && (
        <RolSelector rolesDisponibles={disponibles} onAssign={handleAssign} isLoading={loading} />
      )}
    </div>
  );
};