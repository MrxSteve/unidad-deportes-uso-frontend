import { SoporteTec } from './SoporteTec';

export default function Footer() {
  return (
    <footer className="bg-slate-500 backdrop-blur-md border-t border-neutral-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-neutral-600 mb-4 md:mb-0">
            © 2026 Sistema de Gestión Deportiva. Todos los derechos reservados.
          </p>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={(e) => { 
                e.preventDefault(); 
                SoporteTec(); // Solo llamas a la función, no necesitas estado
              }}
              className="text-sm text-neutral-600 hover:text-primary-600 transition-colors flex items-center"
            >
              Ayuda
            </button>
          </div>
        </div>
      </div>
    </footer>
    // Eliminamos el bloque {showSoporte && ...} de aquí abajo
  );
}