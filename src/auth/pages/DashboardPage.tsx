import MainLayout from '../../shared/components/MainLayout';
import Card, { CardHeader, CardTitle, CardContent } from '../../shared/components/Card';
import { useAuthStore } from '../../stores/authStore';

export default function DashboardPage() {
  const { usuario } = useAuthStore();

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="bg-linear-to-r from-primary-500 to-secondary-500 rounded-3xl p-8 text-white shadow-xl">
          <h1 className="text-4xl font-bold mb-2">
            ¡Bienvenido, {usuario?.nombreCompleto}!
          </h1>
          <p className="text-white/90 text-lg">
            Panel de control - Sistema de Gestión Deportiva
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card hoverable className="border-l-4 border-primary-500">
            <div className="flex items-center">
              <div className="p-4 bg-linear-to-br from-primary-500 to-primary-600 rounded-2xl shadow-lg shadow-primary-500/30">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-neutral-600">Disciplinas</p>
                <p className="text-3xl font-bold text-neutral-800 mt-1">0</p>
              </div>
            </div>
          </Card>

          <Card hoverable className="border-l-4 border-secondary-500">
            <div className="flex items-center">
              <div className="p-4 bg-linear-to-br from-secondary-500 to-secondary-600 rounded-2xl shadow-lg shadow-secondary-500/30">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-5">
                <p className="text-sm font-medium text-neutral-600">Horarios</p>
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
                <p className="text-sm font-medium text-neutral-600">Asistencias</p>
                <p className="text-3xl font-bold text-neutral-800 mt-1">0</p>
              </div>
            </div>
          </Card>

          <Card hoverable className="border-l-4 border-orange-500">
            <div className="flex items-center">
              <div className="p-4 bg-linear-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg shadow-orange-500/30">
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
        </div>

        {/* Información del Usuario con diseño mejorado */}
        <Card className="bg-linear-to-br from-white to-neutral-50">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <div className="w-10 h-10 bg-linear-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
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
                      className="px-3 py-1.5 bg-linear-to-r from-primary-500 to-primary-600 text-white text-sm font-semibold rounded-full shadow-md"
                    >
                      {rol}
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
