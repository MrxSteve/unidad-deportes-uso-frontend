import type { ReactNode } from 'react';
import { useAuthStore } from '../../stores/authStore';
import { authService } from '../../auth/services/authService';
import Button from './Button';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const { usuario } = useAuthStore();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50/20 to-secondary-50/20">
      <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-neutral-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center group cursor-pointer">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 via-primary-600 to-secondary-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg shadow-primary-500/30 group-hover:shadow-xl group-hover:shadow-primary-500/40 transition-all duration-300 group-hover:scale-105">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    Sistema Deportivo
                  </span>
                  <p className="text-xs text-neutral-500 font-medium">Gestión de Actividades</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {usuario && (
                <>
                  <div className="flex items-center space-x-3 bg-gradient-to-r from-neutral-50 to-neutral-100 px-4 py-2 rounded-2xl border border-neutral-200 shadow-sm">
                    {usuario.fotoUrl ? (
                      <img
                        src={usuario.fotoUrl}
                        alt={usuario.nombreCompleto}
                        className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-secondary-500 to-secondary-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {usuario.nombreCompleto.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="hidden md:block">
                      <p className="text-sm font-bold text-neutral-800">
                        {usuario.nombreCompleto}
                      </p>
                      <p className="text-xs text-neutral-500">{usuario.email}</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => authService.logout()}
                    variant="outline"
                    size="sm"
                    className="shadow-sm hover:shadow-md"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Cerrar sesión
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {children}
      </main>

      <footer className="bg-white/80 backdrop-blur-md border-t border-neutral-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-neutral-600 mb-4 md:mb-0">
              © 2026 Sistema de Gestión Deportiva. Todos los derechos reservados.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-sm text-neutral-600 hover:text-primary-600 transition-colors">Ayuda</a>
              <a href="#" className="text-sm text-neutral-600 hover:text-primary-600 transition-colors">Soporte</a>
              <a href="#" className="text-sm text-neutral-600 hover:text-primary-600 transition-colors">Privacidad</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
