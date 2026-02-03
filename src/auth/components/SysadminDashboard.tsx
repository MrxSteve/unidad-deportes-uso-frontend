import { useNavigate } from "react-router-dom";
import Card, { CardHeader, CardTitle, CardContent } from "../../shared/components/Card";
import TotalUsuariosCard from "../../admin/components/TotalUsuariosCard"; // Tu componente existente

export const SysadminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* 1. KPIs del Admin (Grid Superior) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Tarjeta importada de Usuarios Totales */}
        <TotalUsuariosCard />

        <Card hoverable className="border-l-4 border-indigo-500">
           {/* ... Contenido "Configuración Sistema" (KPI pequeño) ... */}
           <div className="p-4 flex items-center">
             <div className="ml-5">
                <p className="text-sm font-medium text-neutral-600">Configuración</p>
                <p className="text-3xl font-bold text-neutral-800 mt-1">Sistema</p>
             </div>
           </div>
        </Card>
      </div>

      {/* 2. Panel Principal de Configuración */}
      <Card>
        <CardHeader>
          <CardTitle>Configuración del Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Botón Gestión de Usuarios (ROJO) -> Redirige a RolesPage */}
            <button
              onClick={() => navigate("/admin/usuarios")}
              className="p-6 bg-linear-to-br from-red-50 to-red-100 rounded-xl hover:shadow-lg transition-all text-left group"
            >
               {/* ... SVG y Textos de Gestión Usuarios ... */}
               <h3 className="text-lg font-bold text-gray-800 mb-1">Gestión de Usuarios</h3>
            </button>

            {/* Botón Configuración (AZUL) */}
           
          </div>
        </CardContent>
      </Card>
    </div>
  );
};