import { useState, useEffect } from 'react';
import MainLayout from '../../../shared/components/MainLayout';
import Card, { CardHeader, CardTitle, CardContent } from '../../../shared/components/Card';
import Button from '../../../shared/components/Button';
import LoadingSpinner from '../../../shared/components/LoadingSpinner';
import { disciplinaService } from '../../../services/disciplinaService';
import { useAuthStore } from '../../../stores/authStore';
import { ROLES } from '../../../auth/utils/roleUtils';
import type { DisciplinaResponse } from '../../../types/disciplina.types';
import { showErrorAlert, showSuccessAlert, showConfirmDialog } from '../../../shared/utils/alerts';
import CrearDisciplinaModal from '../components/CrearDisciplinaModal';
import EditarDisciplinaModal from '../components/EditarDisciplinaModal';

export default function DisciplinasPage() {
  const { usuario, activeRole } = useAuthStore();
  const [disciplinas, setDisciplinas] = useState<DisciplinaResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [mostrarModalCrear, setMostrarModalCrear] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [disciplinaSeleccionada, setDisciplinaSeleccionada] = useState<DisciplinaResponse | null>(null);

  const puedeGestionar = activeRole === ROLES.SYSADMIN || activeRole === ROLES.MANAGER;

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

  const handleCrearDisciplina = () => {
    setMostrarModalCrear(true);
  };

  const handleEditarDisciplina = (disciplina: DisciplinaResponse) => {
    setDisciplinaSeleccionada(disciplina);
    setMostrarModalEditar(true);
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

  const handleDisciplinaCreada = () => {
    setMostrarModalCrear(false);
    cargarDisciplinas();
  };

  const handleDisciplinaActualizada = () => {
    setMostrarModalEditar(false);
    setDisciplinaSeleccionada(null);
    cargarDisciplinas();
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-96">
          <LoadingSpinner size="lg" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800">Disciplinas Deportivas</h1>
            <p className="text-neutral-600 mt-1">Explora las disciplinas disponibles</p>
          </div>
          {puedeGestionar && (
            <Button onClick={handleCrearDisciplina} variant="primary">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Nueva Disciplina
            </Button>
          )}
        </div>

        {disciplinas.length === 0 ? (
          <Card>
            <CardContent>
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-gray-600 mb-4">No hay disciplinas disponibles</p>
                {puedeGestionar && (
                  <Button onClick={handleCrearDisciplina} variant="primary">
                    Crear la primera disciplina
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {disciplinas.map((disciplina) => (
              <Card key={disciplina.id} hoverable>
                <CardContent>
                  {disciplina.imagenUrl && (
                    <div className="mb-4 rounded-xl overflow-hidden bg-neutral-100">
                      <img
                        src={disciplina.imagenUrl}
                        alt={disciplina.nombre}
                        className="w-full h-48 object-cover"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-neutral-800 mb-3">{disciplina.nombre}</h3>
                  
                  <div className="flex gap-2">
                    {puedeGestionar && (
                      <>
                        <Button
                          onClick={() => handleEditarDisciplina(disciplina)}
                          variant="secondary"
                          className="flex-1"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Editar
                        </Button>
                        <Button
                          onClick={() => handleEliminarDisciplina(disciplina)}
                          variant="danger"
                          className="flex-1"
                        >
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Eliminar
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {mostrarModalCrear && (
        <CrearDisciplinaModal
          onClose={() => setMostrarModalCrear(false)}
          onSuccess={handleDisciplinaCreada}
        />
      )}

      {mostrarModalEditar && disciplinaSeleccionada && (
        <EditarDisciplinaModal
          disciplina={disciplinaSeleccionada}
          onClose={() => {
            setMostrarModalEditar(false);
            setDisciplinaSeleccionada(null);
          }}
          onSuccess={handleDisciplinaActualizada}
        />
      )}
    </MainLayout>
  );
}
