import type { ReactNode } from "react";
import  { useState} from "react";
import { useAuthStore } from "../../stores/authStore";
import { authService } from "../../auth/services/authService";
import Button from "./Button";
import usoLogo from "../../assets/logo-uso.png";
import Footer from "./Footer";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { usuario } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-br from-neutral-50 via-primary-50/20 to-secondary-50/20">
      <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-neutral-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo y Texto - Responsivo */}
            <div className="flex items-center">
              <div className="shrink-0 flex items-center gap-2 md:gap-4 group cursor-pointer">
                <img
                  src={usoLogo}
                  alt="Logo USO"
                  className="h-9 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <div className="flex flex-col">
                  <span className="text-lg md:text-xl font-bold bg-linear-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent leading-tight">
                    Sistema Deportivo
                  </span>
                  <p className="hidden xs:block text-[10px] md:text-xs text-neutral-500 font-medium">
                    Gestión de Actividades
                  </p>
                </div>
              </div>
            </div>

            {/* Perfil del Usuario / Menú */}
            <div className="flex items-center">
              {usuario && (
                <div className="relative">
                  {/* Trigger del Menú (Foto) */}
                  <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center space-x-3 bg-neutral-50 hover:bg-neutral-100 p-1 md:px-4 md:py-2 rounded-full md:rounded-2xl border border-neutral-200 transition-all focus:ring-2 focus:ring-primary-500/20"
                  >
                    {usuario.fotoUrl ? (
                      <img
                        src={usuario.fotoUrl}
                        alt={usuario.nombreCompleto}
                        className="w-9 h-9 md:w-10 md:h-10 rounded-full border-2 border-white shadow-sm"
                      />
                    ) : (
                      <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-linear-to-br from-secondary-500 to-secondary-600 flex items-center justify-center text-white font-bold shadow-md">
                        {usuario.nombreCompleto.charAt(0).toUpperCase()}
                      </div>
                    )}
                    
                    {/* Texto visible solo en Desktop */}
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-bold text-neutral-800 leading-none">
                        {usuario.nombreCompleto.split(' ')[0]}
                      </p>
                      <p className="text-[10px] text-neutral-500 mt-1">Mi Perfil</p>
                    </div>
                  </button>

                  {/* Dropdown Menu (Móvil y Desktop) */}
                  {isMenuOpen && (
                    <>
                      {/* Overlay para cerrar al hacer click fuera */}
                      <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)}></div>
                      
                      <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-neutral-100 py-2 z-20 animate-in fade-in zoom-in duration-200">
                        <div className="px-4 py-3 border-b border-neutral-50">
                          <p className="text-sm font-bold text-neutral-800 truncate">{usuario.nombreCompleto}</p>
                          <p className="text-xs text-neutral-500 truncate">{usuario.email}</p>
                        </div>
                        
                        <div className="p-2">
                          <Button
                            onClick={() => authService.logout()}
                            variant="outline"
                            className="w-full justify-start border-none hover:bg-red-50 hover:text-red-600 text-neutral-600 transition-colors"
                          >
                            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Cerrar sesión
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>

      <Footer />
    </div>
  );
}