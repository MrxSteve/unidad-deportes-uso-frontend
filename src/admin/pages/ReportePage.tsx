// src/features/reportes/pages/ReportesPage.tsx
import { useState, useEffect } from 'react';
import { Users, ShieldCheck, UserCircle, Loader2 } from 'lucide-react';
import DashboardLayout from '../../shared/components/DashboardLayout';
import { StatCard } from '../components/StatCard';
import { reporteService } from '../services/reporteService';

export default function ReportesPage() {
  const [data, setData] = useState({
    managers: 0,
    estudiantes: 0,
    loading: true
  });

  useEffect(() => {
    const obtenerEstadisticas = async () => {
      try {
        // Ejecutamos ambas peticiones en paralelo para mayor eficiencia
        const [managers, estudiantes] = await Promise.all([
          reporteService.getContarManagers(), //
          reporteService.getContarEstudiantes() //
        ]);

        setData({
          managers,
          estudiantes,
          loading: false
        });
      } catch (error) {
        setData(prev => ({ ...prev, loading: false }));
      }
    };

    obtenerEstadisticas();
  }, []);

  if (data.loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-96">
          <Loader2 className="animate-spin text-indigo-600" size={48} />
          <p className="mt-4 text-slate-500 font-medium">Cargando estadísticas...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <header>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Reportes Generales</h1>
          <p className="text-slate-500 mt-1">Visualización de métricas y participación de usuarios.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard 
            title="Managers Activos"
            value={data.managers}
            color="indigo"
            icon={<ShieldCheck size={28} />}
          />
          
          <StatCard 
            title="Estudiantes Registrados"
            value={data.estudiantes}
            color="emerald"
            icon={<UserCircle size={28} />}
          />

         
        </div>
      </div>
    </DashboardLayout>
  );
}