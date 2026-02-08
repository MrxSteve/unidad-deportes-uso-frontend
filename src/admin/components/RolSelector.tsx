import { useState } from "react";
import type { Rol } from "../../types/roles.types";
import { Plus, Check } from "lucide-react"; // Añadí lucide para consistencia

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
      {/* Botón Principal: Ahora Indigo/Slate */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isLoading || rolesDisponibles.length === 0}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
      >
        <Plus size={14} strokeWidth={3} />
        Asignar Nuevo Rol
      </button>

      {/* Menú Desplegable: Estilo Limpio */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          
          <div className="absolute right-0 md:left-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl shadow-slate-200 border border-slate-100 py-2 z-20 animate-in fade-in zoom-in duration-200 origin-top-right md:origin-top-left">
            <div className="px-4 py-2 border-b border-slate-50 mb-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Opciones de Acceso
              </span>
            </div>
            
            <div className="max-h-60 overflow-y-auto">
              {rolesDisponibles.map((rol) => (
                <button
                  key={rol.id}
                  onClick={() => handleSelect(rol.id)}
                  className="w-full text-left px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors flex items-center justify-between group"
                >
                  {rol.nombre}
                  <Check className="w-4 h-4 opacity-0 group-hover:opacity-100 text-indigo-500 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};