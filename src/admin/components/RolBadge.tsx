import type { Rol } from "../../types/roles.types";

interface Props {
  rol: Rol | string; // Soporta ambos formatos detectados en Network
  onRemove: (rolId: number | string) => void;
  isLoading: boolean;
}

export const RolBadge = ({ rol, onRemove, isLoading }: Props) => {
  // Extraemos el nombre dependiendo del formato
  const nombre = typeof rol === 'string' ? rol : rol?.nombre;
  const id = typeof rol === 'string' ? rol : rol?.id;

  return (
    <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1.5 rounded-xl border border-blue-100 shadow-sm shrink-0 animate-in fade-in duration-300">
      <span className="text-[10px] font-black uppercase tracking-wider">
        {nombre || 'SIN NOMBRE'} 
      </span> 
      
      <button 
        onClick={() => onRemove(id)} 
        disabled={isLoading}
        className="ml-1 p-0.5 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors disabled:opacity-30 cursor-pointer"
      >
        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};