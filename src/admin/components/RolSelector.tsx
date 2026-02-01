import { useState } from "react";
import type { Rol } from "../../types/roles.types";

interface Props {
  rolesDisponibles: Rol[];
  onAssign: (rolId: number) => void;
  isLoading: boolean;
}

export const RolSelector = ({ rolesDisponibles, onAssign, isLoading }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (id: number) => {
    onAssign(id);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Botón Principal */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading || rolesDisponibles.length === 0}
        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-neutral-200 rounded-xl text-[11px] font-bold text-neutral-600 hover:bg-neutral-50 hover:border-primary-300 transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg className="w-3.5 h-3.5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Asignar Nuevo Rol
      </button>

      {/* Menú Desplegable */}
      {isOpen && (
        <>
          {/* Overlay para cerrar al hacer click fuera */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          
          <div className="absolute left-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-neutral-100 py-2 z-20 animate-in fade-in zoom-in duration-200">
            <div className="px-4 py-1.5 border-b border-neutral-50 mb-1">
              <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Roles Disponibles</span>
            </div>
            
            {rolesDisponibles.map((rol) => (
              <button
                key={rol.id}
                onClick={() => handleSelect(rol.id)}
                className="w-full text-left px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-primary-50 hover:text-primary-700 transition-colors flex items-center justify-between group"
              >
                {rol.nombre}
                <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 text-primary-500 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};