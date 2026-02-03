import { useNavigate } from "react-router-dom";
import Card, { CardHeader, CardTitle, CardContent } from "../../shared/components/Card";

export const StudentDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* 1. KPIs del Estudiante (Grid Superior) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card hoverable className="border-l-4 border-primary-500">
           {/* ... (Contenido de Mis Disciplinas: Icono y contador 0) ... */}
           <CardContent className="flex items-center p-4">
             {/* Pega aquí el SVG y textos de "Mis Disciplinas" */}
             <div className="ml-5">
               <p className="text-sm font-medium text-neutral-600">Mis Disciplinas</p>
               <p className="text-3xl font-bold text-neutral-800 mt-1">0</p>
             </div>
           </CardContent>
        </Card>

        <Card hoverable className="border-l-4 border-green-500">
           {/* ... (Contenido de Mis Asistencias) ... */}
           <CardContent className="flex items-center p-4">
             {/* Pega aquí el SVG y textos de "Mis Asistencias" */}
             <div className="ml-5">
               <p className="text-sm font-medium text-neutral-600">Mis Asistencias</p>
               <p className="text-3xl font-bold text-neutral-800 mt-1">0</p>
             </div>
           </CardContent>
        </Card>
      </div>

      {/* 2. Sección Principal del Estudiante (Inscripciones) */}
      <Card>
        <CardHeader>
          <CardTitle>Mis Inscripciones</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            {/* SVG de lista vacía */}
            <p className="text-gray-600 mb-4">No estás inscrito en ninguna disciplina</p>
            <button
              onClick={() => navigate("/disciplinas")}
              className="px-6 py-3 bg-linear-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Explorar Disciplinas
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};