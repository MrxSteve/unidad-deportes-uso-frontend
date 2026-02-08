import type { ReactNode } from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { authService } from "../../auth/services/authService";
import { ROLES, getRoleLabel, hasMultipleRoles } from "../../auth/utils/roleUtils";
import usoLogo from "../../assets/logo-uso.png";

interface DashboardLayoutProps {
  children: ReactNode;
}

interface MenuItem {
  id: string;
  label: string;
  icon: ReactNode;
  path: string;
  roles: string[];
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { usuario, activeRole, setActiveRole, clearAuth } = useAuthStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Definición de ítems del menú organizada por acceso y rol
  const menuItems: MenuItem[] = [
    {
      id: 'inicio',
      label: 'Inicio',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      path: '/dashboard',
      roles: [ROLES.STUDENT, ROLES.MANAGER, ROLES.SYSADMIN]
    },
    {
      id: 'disciplinas',
      label: 'Disciplinas',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      path: '/disciplinas',
      roles: [ROLES.STUDENT, ROLES.MANAGER, ROLES.SYSADMIN]
    },
    {
      id: 'eventos',
      label: 'Gestión de Eventos',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      path: '/eventos',
      roles: [ROLES.MANAGER, ROLES.SYSADMIN]
    },
    {
      id: 'reportes',
      label: 'Reportes',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      path: '/reportes',
      roles: [ROLES.SYSADMIN]
    },
    {
      id: 'configuracion',
      label: 'Configuración',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      path: '/configuracion',
      roles: [ROLES.SYSADMIN]
    }
  ];

  const visibleMenuItems = menuItems.filter(item => 
    activeRole && item.roles.includes(activeRole)
  );

  const handleLogout = async () => {
    await authService.logout();
    clearAuth();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-linear-to-br from-neutral-50 via-primary-50/20 to-secondary-50/20">
      {/* Header Superior */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-neutral-100 sticky top-0 z-50">
        <div className="flex justify-between items-center h-16 px-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg hover:bg-neutral-100 transition-colors lg:hidden"
            >
              <svg className="w-6 h-6 text-neutral-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
              <img src={usoLogo} alt="Logo USO" className="h-10 w-auto" />
              <div className="hidden sm:block">
                <span className="text-lg font-bold bg-linear-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                  Sistema Deportivo
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {hasMultipleRoles(usuario) && (
              <div className="hidden md:flex items-center gap-2 bg-neutral-50 px-3 py-2 rounded-xl border border-neutral-200">
                <span className="text-xs text-neutral-600 font-medium">Rol:</span>
                <select
                  value={activeRole || ''}
                  onChange={(e) => setActiveRole(e.target.value)}
                  className="text-sm font-semibold bg-transparent border-none outline-none cursor-pointer"
                >
                  {usuario?.roles.map((rol) => (
                    <option key={rol} value={rol}>{getRoleLabel(rol)}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="relative">
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="flex items-center gap-2 bg-neutral-50 hover:bg-neutral-100 px-3 py-2 rounded-xl border border-neutral-200 transition-all"
              >
                {usuario?.fotoUrl ? (
                  <img src={usuario.fotoUrl} alt={usuario.nombreCompleto} className="w-8 h-8 rounded-full" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-secondary-500 to-secondary-600 flex items-center justify-center text-white font-bold text-sm">
                    {usuario?.nombreCompleto.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:block text-sm font-semibold text-neutral-800">
                  {usuario?.nombreCompleto.split(' ')[0]}
                </span>
                <svg className="w-4 h-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isProfileMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsProfileMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-neutral-200 py-2 z-20 animate-in fade-in zoom-in duration-200">
                    <div className="px-4 py-3 border-b border-neutral-100">
                      <p className="text-sm font-bold text-neutral-800">{usuario?.nombreCompleto}</p>
                      <p className="text-xs text-neutral-500 mt-1">{usuario?.email}</p>
                    </div>
                    <button
                      onClick={() => { navigate('/perfil'); setIsProfileMenuOpen(false); }}
                      className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Ver Perfil
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Cerrar Sesión
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Cuerpo Principal con Sidebar */}
      <div className="flex">
        <aside
          className={`fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-neutral-200 transition-all duration-300 z-40 ${
            isSidebarOpen ? 'w-64' : 'w-0 lg:w-16'
          } overflow-hidden`}
        >
          <nav className="p-4 space-y-2">
            {visibleMenuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => { navigate(item.path); if (window.innerWidth < 1024) setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive(item.path)
                    ? 'bg-linear-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/30 font-bold'
                    : 'text-neutral-700 hover:bg-neutral-100'
                } ${!isSidebarOpen && 'lg:justify-center lg:px-2'}`}
              >
                {item.icon}
                {isSidebarOpen && <span className="font-medium">{item.label}</span>}
              </button>
            ))}
          </nav>
        </aside>

        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}