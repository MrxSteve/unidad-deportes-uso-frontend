import DashboardLayout from '../../shared/components/DashboardLayout';
import Card, { CardHeader, CardTitle, CardContent } from '../../shared/components/Card';
import { useAuthStore } from '../../stores/authStore';
import { ROLES } from '../utils/roleUtils';
import TotalUsuariosCard from '../../admin/components/TotalUsuariosCard';
import TotalDisciplinasCard from '../../admin/components/TotalDisciplinasCard';

export default function DashboardHome() {
  const { usuario, activeRole } = useAuthStore();

  const getWelcomeMessage = () => {
    switch (activeRole) {
      case ROLES.SYSADMIN:
        return {
          title: '¡Bienvenido, Administrador!',
          subtitle: 'Panel de control del sistema',
          description: 'Tienes acceso completo a todas las funcionalidades del sistema.'
        };
      case ROLES.MANAGER:
        return {
          title: '¡Bienvenido, Gestor!',
          subtitle: 'Panel de gestión',
          description: 'Gestiona disciplinas, eventos y supervisa las actividades deportivas.'
        };
      case ROLES.STUDENT:
        return {
          title: `¡Hola, ${usuario?.nombreCompleto.split(' ')[0]}!`,
          subtitle: 'Tu portal deportivo',
          description: 'Explora disciplinas, inscríbete y mantente activo.'
        };
      default:
        return {
          title: '¡Bienvenido!',
          subtitle: 'Sistema Deportivo USO',
          description: 'Selecciona una opción del menú para comenzar.'
        };
    }
  };

  const welcome = getWelcomeMessage();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Banner de bienvenida */}
        <div className="bg-linear-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 text-white shadow-xl">
          <h1 className="text-4xl font-bold mb-2">{welcome.title}</h1>
          <p className="text-white/90 text-lg mb-1">{welcome.subtitle}</p>
          <p className="text-white/80 text-sm">{welcome.description}</p>
        </div>

        {/* Estadísticas según rol */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeRole === ROLES.STUDENT && (
            <>
              <Card hoverable className="border-l-4 border-primary-500">
                <div className="flex items-center">
                  <div className="p-4 bg-linear-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg shadow-primary-500/30">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-neutral-600">Mis Disciplinas</p>
                    <p className="text-3xl font-bold text-neutral-800 mt-1">0</p>
                  </div>
                </div>
              </Card>

              <Card hoverable className="border-l-4 border-green-500">
                <div className="flex items-center">
                  <div className="p-4 bg-linear-to-br from-green-500 to-green-600 rounded-2xl shadow-lg shadow-green-500/30">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-neutral-600">Mis Asistencias</p>
                    <p className="text-3xl font-bold text-neutral-800 mt-1">0</p>
                  </div>
                </div>
              </Card>
            </>
          )}

          {(activeRole === ROLES.MANAGER || activeRole === ROLES.SYSADMIN) && (
            <>
              <TotalDisciplinasCard />

              <Card hoverable className="border-l-4 border-orange-500">
                <div className="flex items-center">
                  <div className="p-4 bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg shadow-orange-500/30">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-neutral-600">Eventos Activos</p>
                    <p className="text-3xl font-bold text-neutral-800 mt-1">0</p>
                  </div>
                </div>
              </Card>
            </>
          )}

          {activeRole === ROLES.SYSADMIN && (
            <>
              <TotalUsuariosCard />

              <Card hoverable className="border-l-4 border-indigo-500">
                <div className="flex items-center">
                  <div className="p-4 bg-linear-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/30">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-neutral-600">Sistema</p>
                    <p className="text-xl font-bold text-neutral-800 mt-1">Operativo</p>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>

        {/* Acceso rápido */}
        <Card>
          <CardHeader>
            <CardTitle>Acceso Rápido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="p-6 bg-linear -to-br from-primary-50 to-primary-100 rounded-xl hover:shadow-lg transition-all text-left group">
                <svg className="w-8 h-8 text-primary-600 mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <h3 className="text-sm font-bold text-gray-800">Disciplinas</h3>
              </button>

              {activeRole === ROLES.STUDENT && (
                <button className="p-6 bg-linear -to-br from-green-50 to-green-100 rounded-xl hover:shadow-lg transition-all text-left group">
                  <svg className="w-8 h-8 text-green-600 mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h3 className="text-sm font-bold text-gray-800">Inscripciones</h3>
                </button>
              )}

              {(activeRole === ROLES.MANAGER || activeRole === ROLES.SYSADMIN) && (
                <>
                  <button className="p-6 bg-linear -to-br from-orange-50 to-orange-100 rounded-xl hover:shadow-lg transition-all text-left group">
                    <svg className="w-8 h-8 text-orange-600 mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-sm font-bold text-gray-800">Eventos</h3>
                  </button>
                  
                  {activeRole === ROLES.SYSADMIN && (
                    <button className="p-6 bg-linear -to-br from-red-50 to-red-100 rounded-xl hover:shadow-lg transition-all text-left group">
                      <svg className="w-8 h-8 text-red-600 mb-3 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      <h3 className="text-sm font-bold text-gray-800">Usuarios</h3>
                    </button>
                  )}
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
