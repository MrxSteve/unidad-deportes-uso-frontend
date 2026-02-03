import { SoporteTec } from './SoporteTec';
import { LifeBuoy, Copyright } from 'lucide-react'; // Opcional: para iconos

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-10 border-t bg-secondary-950 backdrop-blur-xl ">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          
          {/* Copyright Section */}
          <div className="flex items-center space-x-2 text-neutral-500 dark:text-neutral-400">
            <Copyright size={16} />
            <span className="text-sm font-medium tracking-tight">
              {currentYear} <span className="text-neutral-900 dark:text-white font-bold">Sistema de Gestión Deportiva</span>.
            </span>
          </div>

          {/* Links / Actions Section */}
          <div className="flex items-center space-x-8">
            <button
              onClick={(e) => {
                e.preventDefault();
                SoporteTec();
              }}
              className="group flex items-center space-x-2 text-sm font-semibold text-neutral-600 hover:text-blue-600 transition-all duration-300 ease-in-out"
            >
              <div className="p-2 rounded-full bg-neutral-100 group-hover:bg-blue-50 transition-colors">
                <LifeBuoy size={18} className="group-hover:rotate-12 transition-transform" />
              </div>
              <span className='text-white'>Centro de Ayuda</span>
            </button>
            
            <div className="hidden md:block h-4 w-px bg-neutral-300"></div>

            <p className="hidden md:block text-xs uppercase tracking-widest text-neutral-400 font-bold">
              Versión 1.0
            </p>
          </div>
        </div>

        {/* Línea decorativa inferior (opcional) */}
        <div className="mt-8 h-1 w-full bg-linear-to-r from-transparent via-blue-500/20 to-transparent"></div>
      </div>
    </footer>
  );
}