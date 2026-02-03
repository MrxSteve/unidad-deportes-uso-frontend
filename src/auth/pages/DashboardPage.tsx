import MainLayout from "../../shared/components/MainLayout";
import Card, { CardContent } from "../../shared/components/Card";
import { useAuthStore } from "../../stores/authStore";
import { hasMultipleRoles, getRoleLabel, getRoleColor, ROLES } from "../utils/roleUtils";
import { StudentDashboard } from "../components/StudentDashboard";
import { ManagerDashboard } from "../components/ManagerDashboard";
import { SysadminDashboard } from "../components/SysadminDashboard";
import Footer from "../../shared/components/Footer";

export default function DashboardPage() {
  const { usuario, activeRole, setActiveRole } = useAuthStore();

  const showStudentContent = activeRole === ROLES.STUDENT;
  const showManagerContent = activeRole === ROLES.MANAGER;
  const showSysadminContent = activeRole === ROLES.SYSADMIN;

  return (
    <>
      <MainLayout>
        <div className="space-y-8">
          
          {/* 1. SECCIÓN DE BIENVENIDA */}
          <div className="bg-linear-to-r from-primary-500 to-secondary-500 rounded-3xl p-6 md:p-8 text-white shadow-xl">
            <h1 className="text-2xl md:text-4xl font-bold mb-2">
              ¡Bienvenido, {usuario?.nombreCompleto?.split(' ')[0]}!
            </h1>
            <p className="text-white/90 text-sm md:text-lg">
              Panel de control - Sistema de Gestión Deportiva
            </p>
          </div>

          {/* 2. SELECTOR DE ROLES (RESPONSIVE) */}
          {hasMultipleRoles(usuario) && (
            <Card className="bg-linear-to-r from-blue-50 to-purple-50">
              <CardContent>
                {/* CAMBIO CLAVE: flex-col para móvil, md:flex-row para escritorio */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
                  
                  {/* Texto: Ocupa todo el ancho en móvil, se ajusta en desktop */}
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      Selecciona tu rol activo
                    </h3>
                    <p className="text-sm text-gray-600">
                      Cambia entre roles para ver distintas opciones
                    </p>
                  </div>

                  {/* Botones: Se envuelven (wrap) si no caben y ocupan ancho completo en móvil */}
                  <div className="flex flex-wrap gap-3 w-full md:w-auto">
                    {usuario?.roles.map((rol) => (
                      <button
                        key={rol}
                        onClick={() => setActiveRole(rol)}
                        // flex-1 hace que los botones se estiren para llenar el espacio en móviles
                        className={`flex-1 md:flex-none px-5 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap text-center ${
                          activeRole === rol
                            ? `bg-linear-to-r ${getRoleColor(rol)} text-white shadow-lg scale-105`
                            : "bg-white text-gray-700 hover:bg-gray-100 shadow"
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

          {/* 3. CONTENIDO ESPECÍFICO */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {showStudentContent && <StudentDashboard />}
            {showManagerContent && <ManagerDashboard />}
            {showSysadminContent && <SysadminDashboard />}
          </div>

        </div>
      </MainLayout>
      <Footer />
    </>
  );
}