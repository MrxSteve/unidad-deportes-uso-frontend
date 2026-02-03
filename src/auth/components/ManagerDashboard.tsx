import { useNavigate } from "react-router-dom";
import Card, { CardHeader, CardTitle, CardContent } from "../../shared/components/Card";
import { Users } from "lucide-react"; // Importamos icono para usuarios

export const ManagerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* 1. KPIs del Manager (Tus tarjetas existentes) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card hoverable className="border-l-4 border-purple-500">
           <div className="p-4 flex items-center">
             <div className="ml-5">
                <p className="text-sm font-medium text-neutral-600">Gestión Disciplinas</p>
                <p className="text-3xl font-bold text-neutral-800 mt-1">0</p>
             </div>
           </div>
        </Card>

        <Card hoverable className="border-l-4 border-orange-500">
           <div className="p-4 flex items-center">
             <div className="ml-5">
                <p className="text-sm font-medium text-neutral-600">Eventos</p>
                <p className="text-3xl font-bold text-neutral-800 mt-1">0</p>
             </div>
           </div>
        </Card>
      </div>

      {/* 2. Panel de Acciones */}
      <Card>
        <CardHeader>
          <CardTitle>Gestión y Administración</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* --- NUEVA CARD PARA GESTIÓN DE USUARIOS (MANAGER) --- */}
            <button
              onClick={() => navigate("/manager/usuarios")} // Ruta específica para manager
              className="p-6 bg-linear-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-lg transition-all text-left group border border-purple-100"
            >
               <div className="flex items-center gap-4 mb-3">
                 <div className="p-3 bg-white rounded-lg shadow-sm text-purple-600 group-hover:scale-110 transition-transform">
                   <Users size={24} />
                 </div>
               </div>
               <h3 className="text-lg font-bold text-gray-800 mb-1">Gestión de Usuarios</h3>
               <p className="text-sm text-gray-600">Asignar roles de Estudiante o Gestor</p>
            </button>

            {/* Tus otros botones existentes */}
            <button
                onClick={() => navigate("/disciplinas")}
                className="p-6 bg-linear-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-lg transition-all text-left group"
              >
                <h3 className="text-lg font-bold text-gray-800 mb-1">Gestión Disciplinas</h3>
                <p className="text-sm text-gray-600">Crear y editar disciplinas</p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};