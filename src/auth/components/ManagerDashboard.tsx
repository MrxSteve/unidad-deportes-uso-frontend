import { useNavigate } from "react-router-dom";
import Card, { CardHeader, CardTitle, CardContent } from "../../shared/components/Card";

export const ManagerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* 1. KPIs del Manager */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card hoverable className="border-l-4 border-purple-500">
           {/* ... Contenido "Gestión Disciplinas" ... */}
           <div className="p-4 flex items-center">
             <div className="ml-5">
                <p className="text-sm font-medium text-neutral-600">Gestión Disciplinas</p>
                <p className="text-3xl font-bold text-neutral-800 mt-1">0</p>
             </div>
           </div>
        </Card>

        <Card hoverable className="border-l-4 border-orange-500">
           {/* ... Contenido "Eventos" ... */}
           <div className="p-4 flex items-center">
             <div className="ml-5">
                <p className="text-sm font-medium text-neutral-600">Eventos</p>
                <p className="text-3xl font-bold text-neutral-800 mt-1">0</p>
             </div>
           </div>
        </Card>
      </div>

      {/* 2. Panel de Acciones del Manager */}
      <Card>
        <CardHeader>
          <CardTitle>Gestión de Disciplinas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Panel de gestión de disciplinas y eventos</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => navigate("/disciplinas")}
                className="px-6 py-3 bg-linear-to-r from-purple-500 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Crear Disciplina
              </button>
              <button className="px-6 py-3 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                Crear Evento
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};