import { useState, useEffect } from 'react';
import { rolService } from '../services/rolServices'; 
import type { Rol } from '../../types/roles.types';
import { RolBadge } from './RolBadge';
import { RolSelector } from './RolSelector'; // Tu componente de selector mejorado
import { showSuccessAlert, showErrorAlert, showConfirmDialog } from '../../shared/utils/alerts';

interface Props {
  usuarioId: number;
  rolesActuales: (Rol | string)[]; // Soporta el formato de búsqueda
}

export const UserRolesManager = ({ usuarioId, rolesActuales: iniciales }: Props) => {
  const [rolesUser, setRolesUser] = useState<(Rol | string)[]>(iniciales);
  const [catalogo, setCatalogo] = useState<Rol[]>([]);
  const [loading, setLoading] = useState(false);

  // 1. Sincronizar estado si cambia el usuario buscado
  useEffect(() => {
    setRolesUser(iniciales);
  }, [usuarioId, iniciales]);

  // 2. Cargar catálogo de roles (necesario para el selector y traducir IDs)
  useEffect(() => {
    rolService.getRoles()
      .then(setCatalogo)
      .catch(() => {
        console.error("No se pudo cargar el catálogo. Verifica que seas ADMIN.");
      });
  }, []);

  // 3. Manejar Asignación (Nuevo Rol)
  const handleAssign = async (rolId: number) => {
    setLoading(true);
    try {
      await rolService.asignarRol(usuarioId, rolId);
      
      // Actualizamos UI inmediatamente
      const nuevo = catalogo.find(r => r.id === rolId);
      if (nuevo) {
        setRolesUser(prev => [...prev, nuevo]);
        showSuccessAlert("¡Asignado!", `Rol agregado exitosamente.`);
      }
    } catch {
      showErrorAlert("Error", "No se pudo asignar. Verifica tus permisos.");
    } finally {
      setLoading(false);
    }
  };

  // 4. Manejar Eliminación
  const handleRemove = async (identifier: number | string) => {
    // Si es string, buscamos su ID numérico en el catálogo
    const rolId = typeof identifier === 'string' 
      ? catalogo.find(r => r.nombre === identifier)?.id 
      : identifier;

    if (!rolId) return showErrorAlert("Error", "No se encontró el ID del rol.");

    const confirm = await showConfirmDialog("¿Quitar permiso?", "El usuario perderá acceso a este nivel.");
    if (!confirm) return;

    setLoading(true);
    try {
      await rolService.removerRol(usuarioId, rolId);
      
      // Actualizamos UI filtrando el rol removido
      setRolesUser(prev => prev.filter(r => {
        const cId = typeof r === 'string' ? catalogo.find(c => c.nombre === r)?.id : r.id;
        return cId !== rolId;
      }));
      showSuccessAlert("Removido", "El rol ha sido eliminado.");
    } catch {
      showErrorAlert("Error", "No se pudo completar la operación.");
    } finally {
      setLoading(false);
    }
  };

  // Filtro para el selector: No mostrar roles que ya tiene
  const disponibles = catalogo.filter(cat => 
    !rolesUser.some(ur => (typeof ur === 'string' ? ur === cat.nombre : ur.id === cat.id))
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-3 p-4 bg-neutral-50/50 rounded-2xl border border-neutral-100 min-h-1">
        <div className="flex flex-wrap gap-2">
          {rolesUser.length > 0 ? (
            rolesUser.map((rol, index) => (
              <RolBadge 
                // Usamos una key combinada para evitar errores de React
                key={typeof rol === 'string' ? `${rol}-${index}` : rol.id} 
                rol={rol} 
                onRemove={handleRemove} 
                isLoading={loading} 
              />
            ))
          ) : (
            <span className="text-[11px] text-neutral-400 italic">Sin roles asignados.</span>
          )}
        </div>

        {/* Solo mostramos el selector si hay catálogo cargado y roles disponibles */}
        {disponibles.length > 0 && catalogo.length > 0 && (
          <>
            <div className="h-6 w-px bg-neutral-200 mx-2 hidden sm:block"></div>
            <RolSelector 
              rolesDisponibles={disponibles} 
              onAssign={handleAssign} 
              isLoading={loading} 
            />
          </>
        )}
      </div>
    </div>
  );
};