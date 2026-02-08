import { useNavigate } from 'react-router-dom';
import { UserCog, Settings } from 'lucide-react';
import DashboardLayout from '../../shared/components/DashboardLayout';
//import TotalUsuariosCard from '../components/TotalUsuariosCard';

export default function ConfigDashboard() {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto py-10 px-6">
        <header className="mb-10">
          <div className="inline-flex items-center p-3 bg-indigo-50 rounded-2xl text-indigo-600 mb-4">
            <Settings size={32} />
          </div>
          <h1 className="text-4xl font-black text-slate-900">Configuración</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Al hacer clic, te lleva a la ruta que ya tienes: /admin/usuarios */}
          <div 
            onClick={() => navigate('/configuracion/usuarios')} 
            className="cursor-pointer bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-100 hover:border-indigo-400 transition-all hover:-translate-y-2"
          >
            <div className="h-16 w-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6">
              <UserCog size={32} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Gestión de Usuarios</h3>
            <p className="text-slate-500 text-sm mt-2 mb-8">Administra roles y permisos.</p>
            
            
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}