import { useState, useEffect } from 'react';
import { UserPlus, Edit, Trash2, Search, Trophy, CheckCircle } from 'lucide-react'; 
import DashboardLayout from '../../../shared/components/DashboardLayout';
import Card, { CardContent } from '../../../shared/components/Card';
import Button from '../../../shared/components/Button';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';
import { disciplinaService } from '../../../services/disciplinaService';
import { inscripcionService } from '../../../admin/services/inscripcionService'; // Asegúrate de tener este service creado
import { useAuthStore } from '../../../stores/authStore';
import { ROLES } from '../../../auth/utils/roleUtils';
import type { DisciplinaResponse } from '../../../types/disciplina.types';
import { showErrorAlert, showSuccessAlert, showConfirmDialog, showConfirmAlert } from '../../../shared/utils/alerts';
import CrearDisciplinaModal from '../components/CrearDisciplinaModal';
import EditarDisciplinaModal from '../components/EditarDisciplinaModal';
import InscribirEstudianteModal from '../../../admin/components/InscribirEstudianteModal';

export default function DisciplinasPage() {
  const { activeRole } = useAuthStore();
  const [disciplinas, setDisciplinas] = useState<DisciplinaResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  
  // Estados para Modales
  const [mostrarModalCrear, setMostrarModalCrear] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [mostrarModalInscribir, setMostrarModalInscribir] = useState(false); 
  const [disciplinaSeleccionada, setDisciplinaSeleccionada] = useState<DisciplinaResponse | null>(null);

  // Permisos simplificados
  const puedeGestionar = activeRole === ROLES.SYSADMIN || activeRole === ROLES.MANAGER;
  const esEstudiante = activeRole === ROLES.STUDENT;

  const cargarDisciplinas = async () => {
    try {
      setLoading(true);
      const data = await disciplinaService.listarDisciplinas();
      setDisciplinas(data);
    } catch (error) {
      showErrorAlert('Error al cargar disciplinas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarDisciplinas();
  }, []);

 const handleAutoInscripcion = async (disciplina: DisciplinaResponse) => {
  const confirmado = await showConfirmAlert(
    'Confirmar Inscripción',
    `¿Deseas inscribirte en la disciplina de ${disciplina.nombre}?`
  );

  if (confirmado) {
    try {
      await inscripcionService.inscribirseComoEstudiante(disciplina.id);
      showSuccessAlert('¡Te has inscrito correctamente!');
    } catch (error) {
      showErrorAlert('No se pudo completar la inscripción.');
    }
  }
};
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!busqueda.trim()) {
      cargarDisciplinas();
      return;
    }
    try {
      setLoading(true);
      const data = await disciplinaService.buscarPorNombre(busqueda);
      setDisciplinas(data ? [data] : []);
    } catch (error) {
      setDisciplinas([]);
    } finally {
      setLoading(false);
    }
  };

 

  const handleInscribirManual = (disciplina: DisciplinaResponse) => {
    setDisciplinaSeleccionada(disciplina);
    setMostrarModalInscribir(true);
  };

  const handleEliminarDisciplina = async (disciplina: DisciplinaResponse) => {
    const confirmado = await showConfirmDialog(
      '¿Estás seguro?',
      `Se eliminará la disciplina "${disciplina.nombre}"`
    );
    if (confirmado) {
      try {
        await disciplinaService.eliminarDisciplina(disciplina.id);
        showSuccessAlert('Disciplina eliminada correctamente');
        cargarDisciplinas();
      } catch (error) {
        showErrorAlert('Error al eliminar disciplina');
      }
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-96">
          <LoadingSpinner size="lg" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Catálogo Deportivo</h1>
            <p className="text-slate-500 mt-1">
              {esEstudiante ? 'Elige tu disciplina e inscríbete' : 'Gestiona disciplinas e inscripciones'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  placeholder="Buscar disciplina..."
                  className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none w-full sm:w-64 transition-all"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                />
              </div>
            </form>

            {puedeGestionar && (
              <Button onClick={() => setMostrarModalCrear(true)} variant="primary" className="shadow-lg shadow-indigo-200">
                <Trophy size={18} className="mr-2" />
                Nueva Disciplina
              </Button>
            )}
          </div>
        </div>

        {/* Listado de Disciplinas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {disciplinas.map((disciplina) => (
            <Card key={disciplina.id} hoverable className="overflow-hidden border-none shadow-xl shadow-slate-200/60 bg-white group">
              <CardContent className="p-0">
                <div className="relative h-48 overflow-hidden">
                  {disciplina.imagenUrl ? (
                    <img src={disciplina.imagenUrl} alt={disciplina.nombre} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-300">
                      <Trophy size={48} />
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4 tracking-tight uppercase">{disciplina.nombre}</h3>
                  
                  <div className="flex flex-col gap-2">
                    {/* ACCIÓN PARA ESTUDIANTE */}
                    {esEstudiante && (
                      <Button 
                        onClick={() => handleAutoInscripcion(disciplina)}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
                      >
                        <CheckCircle size={18} className="mr-2" />
                        Inscribirme
                      </Button>
                    )}

                    {/* ACCIONES PARA MANAGER/ADMIN */}
                    {puedeGestionar && (
                      <>
                        <Button 
                          onClick={() => handleInscribirManual(disciplina)} 
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-md"
                        >
                          <UserPlus size={18} className="mr-2" />
                          Inscribir Estudiante
                        </Button>
                        
                        <div className="flex gap-2">
                          <Button 
                            onClick={() => { setDisciplinaSeleccionada(disciplina); setMostrarModalEditar(true); }} 
                            variant="secondary" 
                            className="flex-1"
                          >
                            <Edit size={16} className="mr-2" /> Editar
                          </Button>
                          <Button 
                            onClick={() => handleEliminarDisciplina(disciplina)} 
                            variant="danger" 
                            className="flex-1"
                          >
                            <Trash2 size={16} className="mr-2" /> Borrar
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* MODALES */}
      {mostrarModalCrear && (
        <CrearDisciplinaModal onClose={() => setMostrarModalCrear(false)} onSuccess={cargarDisciplinas} />
      )}

      {mostrarModalEditar && disciplinaSeleccionada && (
        <EditarDisciplinaModal
          disciplina={disciplinaSeleccionada}
          onClose={() => { setMostrarModalEditar(false); setDisciplinaSeleccionada(null); }}
          onSuccess={cargarDisciplinas}
        />
      )}

      {mostrarModalInscribir && disciplinaSeleccionada && (
        <InscribirEstudianteModal
          disciplina={disciplinaSeleccionada}
          onClose={() => { setMostrarModalInscribir(false); setDisciplinaSeleccionada(null); }}
          onSuccess={() => {
            setMostrarModalInscribir(false);
            setDisciplinaSeleccionada(null);
            showSuccessAlert('Inscripción manual realizada con éxito');
          }}
        />
      )}
    </DashboardLayout>
  );
}