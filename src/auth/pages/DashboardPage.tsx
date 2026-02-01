import MainLayout from '../../shared/components/MainLayout';
import Card, { CardHeader, CardTitle, CardContent } from '../../shared/components/Card';
import { useAuthStore } from '../../stores/authStore';
import { hasRole, hasMultipleRoles, getRoleLabel, getRoleColor, ROLES } from '../utils/roleUtils';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const { usuario, activeRole, setActiveRole } = useAuthStore();
  const navigate = useNavigate();

  const showStudentContent = activeRole === ROLES.STUDENT;
  const showManagerContent = activeRole === ROLES.MANAGER;
  const showSysadminContent = activeRole === ROLES.SYSADMIN;

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 text-white shadow-xl">
          <h1 className="text-4xl font-bold mb-2">
            ¡Bienvenido, {usuario?.nombreCompleto}!
          </h1>
          <p className="text-white/90 text-lg">
            Panel de control - Sistema de Gestión Deportiva
          </p>
        </div>

        {hasMultipleRoles(usuario) && (
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Selecciona tu rol activo</h3>
                  <p className="text-sm text-gray-600">Cambia entre tus diferentes roles para acceder a distintas funcionalidades</p>
                </div>
                <div className="flex gap-3">
                  {usuario?.roles.map((rol) => (
                    <button
                      key={rol}
                      onClick={() => setActiveRole(rol)}
                      className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all ${
                        activeRole === rol
                          ? `bg-gradient-to-r ${getRoleColor(rol)} text-white shadow-lg scale-105`
                          : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                      }`}
                    >
                      {getRoleLabel(rol)}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {showStudentContent && (
            <>
              <Card hoverable className="border-l-4 border-primary-500">
                <div className="flex items-center">
                  <div className="p-4 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg shadow-primary-500/30">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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
                  <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg shadow-green-500/30">
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

          {showManagerContent && (
            <>
              <Card hoverable className="border-l-4 border-purple-500">
                <div className="flex items-center">
                  <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg shadow-purple-500/30">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-neutral-600">Gestión Disciplinas</p>
                    <p className="text-3xl font-bold text-neutral-800 mt-1">0</p>
                  </div>
                </div>
              </Card>

              <Card hoverable className="border-l-4 border-orange-500">
                <div className="flex items-center">
                  <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg shadow-orange-500/30">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-neutral-600">Eventos</p>
                    <p className="text-3xl font-bold text-neutral-800 mt-1">0</p>
                  </div>
                </div>
              </Card>
            </>
          )}

          {showSysadminContent && (
            <>
              <Card hoverable className="border-l-4 border-red-500">
                <div className="flex items-center">
                  <div className="p-4 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl shadow-lg shadow-red-500/30">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-neutral-600">Total Usuarios</p>
                    <p className="text-3xl font-bold text-neutral-800 mt-1">0</p>
                  </div>
                </div>
              </Card>

              <Card hoverable className="border-l-4 border-indigo-500">
                <div className="flex items-center">
                  <div className="p-4 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl shadow-lg shadow-indigo-500/30">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-5">
                    <p className="text-sm font-medium text-neutral-600">Configuración</p>
                    <p className="text-3xl font-bold text-neutral-800 mt-1">Sistema</p>
                  </div>
                </div>
              </Card>
            </>
          )}
        </div>

        {showStudentContent && (
          <Card>
            <CardHeader>
              <CardTitle>Mis Inscripciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <p className="text-gray-600 mb-4">No estás inscrito en ninguna disciplina</p>
                <button 
                  onClick={() => navigate('/disciplinas')}
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Explorar Disciplinas
                </button>
              </div>
            </CardContent>
          </Card>
        )}

        {showManagerContent && (
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Disciplinas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-purple-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <p className="text-gray-600 mb-4">Panel de gestión de disciplinas y eventos</p>
                <div className="flex gap-3 justify-center">
                  <button 
                    onClick={() => navigate('/disciplinas')}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    Crear Disciplina
                  </button>
                  <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                    Crear Evento
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {showSysadminContent && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Gestión de Disciplinas y Eventos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <svg className="w-16 h-16 mx-auto text-purple-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  <p className="text-gray-600 mb-4">Panel de gestión de disciplinas y eventos</p>
                  <div className="flex gap-3 justify-center">
                    <button 
                      onClick={() => navigate('/disciplinas')}
                      className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Gestionar Disciplinas
                    </button>
                    <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                      Gestionar Eventos
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configuración del Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl hover:shadow-lg transition-all text-left">
                    <svg className="w-8 h-8 text-red-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">Gestión de Usuarios</h3>
                    <p className="text-sm text-gray-600">Administrar roles y permisos</p>
                  </button>

                  <button className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl hover:shadow-lg transition-all text-left">
                    <svg className="w-8 h-8 text-indigo-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Configuración</h3>
                  <p className="text-sm text-gray-600">Parámetros del sistema</p>
                </button>

                <button className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-lg transition-all text-left">
                  <svg className="w-8 h-8 text-green-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Reportes</h3>
                  <p className="text-sm text-gray-600">Estadísticas del sistema</p>
                </button>
              </div>
            </CardContent>
          </Card>
          </>
        )}

        <Card className="bg-gradient-to-br from-white to-neutral-50">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              Mi Perfil
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-4 border border-neutral-100 shadow-sm">
                <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-2">Nombre Completo</p>
                <p className="font-semibold text-neutral-800 text-lg">{usuario?.nombreCompleto}</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-neutral-100 shadow-sm">
                <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-2">Email</p>
                <p className="font-semibold text-neutral-800 text-lg">{usuario?.email}</p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-neutral-100 shadow-sm">
                <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-2">Roles</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {usuario?.roles.map((rol) => (
                    <span
                      key={rol}
                      className={`px-3 py-1.5 text-sm font-semibold rounded-full shadow-md ${
                        activeRole === rol
                          ? `bg-gradient-to-r ${getRoleColor(rol)} text-white`
                          : 'bg-neutral-200 text-neutral-700'
                      }`}
                    >
                      {getRoleLabel(rol)}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-neutral-100 shadow-sm">
                <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-2">Estado del Perfil</p>
                <p className="font-semibold text-lg mt-2">
                  {usuario?.perfilCompleto ? (
                    <span className="text-green-600 flex items-center">
                      <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Completo
                    </span>
                  ) : (
                    <span className="text-orange-600 flex items-center">
                      <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Incompleto
                    </span>
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
