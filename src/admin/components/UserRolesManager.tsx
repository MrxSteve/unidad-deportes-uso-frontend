import { useState, useEffect } from 'react';
import { rolService } from '../services/rolServices'; 
import type { Rol } from '../../types/roles.types';
import { showSuccessAlert, showErrorAlert, showConfirmDialog } from '../../shared/utils/alerts';
import { Loader2, ShieldCheck } from 'lucide-react';

interface Props {
  usuarioId: number;
  rolesActuales: (Rol | string)[]; 
}

export const UserRolesManager = ({ usuarioId, rolesActuales: iniciales }: Props) => {
  const [rolesUser, setRolesUser] = useState<(Rol | string)[]>(iniciales);
  const [catalogo, setCatalogo] = useState<Rol[]>([]);
  const [loadingId, setLoadingId] = useState<number | null>(null); // Loading individual por rol

  useEffect(() => {
    setRolesUser(iniciales);
  }, [usuarioId, iniciales]);

  useEffect(() => {
    rolService.getRoles()
      .then(setCatalogo)
      .catch(() => console.error("Error al cargar catálogo de roles."));
  }, []);

  // Función para verificar si el usuario ya tiene el rol
  const tieneRol = (rolNombre: string) => {
    return rolesUser.some(ur => 
      typeof ur === 'string' ? ur === rolNombre : ur.nombre === rolNombre
    );
  };

  const handleToggleRol = async (rol: Rol) => {
    const yaLoTiene = tieneRol(rol.nombre);
    
    if (yaLoTiene) {
      // Lógica de eliminación
      const confirm = await showConfirmDialog(
        `¿Remover rol ${rol.nombre}?`, 
        "El usuario perderá los accesos asociados."
      );
      if (!confirm) return;

      setLoadingId(rol.id);
      try {
        if (rol.nombre === 'MANAGER') {
          await rolService.removerManager(usuarioId);
        } else {
          await rolService.removerRol(usuarioId, rol.id);
        }
        setRolesUser(prev => prev.filter(r => 
          (typeof r === 'string' ? r !== rol.nombre : r.id !== rol.id)
        ));
        showSuccessAlert("Removido", "Permiso actualizado.");
      } catch {
        showErrorAlert("Error", "No se pudo quitar el rol.");
      } finally {
        setLoadingId(null);
      }
    } else {
      // Lógica de asignación
      setLoadingId(rol.id);
      try {
        if (rol.nombre === 'MANAGER') {
          await rolService.convertirEnManager(usuarioId);
        } else {
          await rolService.asignarRol(usuarioId, rol.id);
        }
        setRolesUser(prev => [...prev, rol]);
        showSuccessAlert("Asignado", `Ahora el usuario es ${rol.nombre}.`);
      } catch {
        showErrorAlert("Error", "No se pudo asignar el rol.");
      } finally {
        setLoadingId(null);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {catalogo.map((rol) => {
        const activo = tieneRol(rol.nombre);
        const isLoading = loadingId === rol.id;

        return (
          <label
            key={rol.id}
            className={`
              relative flex items-center justify-between p-4 rounded-2xl border-2 transition-all cursor-pointer
              ${activo 
                ? 'bg-green-50 border-green-500 shadow-sm shadow-green-100' 
                : 'bg-white border-neutral-100 hover:border-neutral-200'}
              ${isLoading ? 'opacity-70 pointer-events-none' : ''}
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`
                p-2 rounded-xl 
                ${activo ? 'bg-green-500 text-white' : 'bg-neutral-100 text-neutral-400'}
              `}>
                <ShieldCheck size={20} />
              </div>
              <div>
                <span className={`block font-bold text-sm ${activo ? 'text-green-700' : 'text-neutral-700'}`}>
                  {rol.nombre}
                </span>
                <span className="text-[10px] text-neutral-400 uppercase font-medium tracking-tight">
                  Acceso de {rol.nombre.toLowerCase()}
                </span>
              </div>
            </div>

            <div className="flex items-center">
              {isLoading ? (
                <Loader2 className="animate-spin text-neutral-400" size={20} />
              ) : (
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-green-600 rounded-lg cursor-pointer"
                  checked={activo}
                  onChange={() => handleToggleRol(rol)}
                />
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
};