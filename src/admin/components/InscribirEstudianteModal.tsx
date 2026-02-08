import { useState } from 'react';
import { Search, Loader2, CheckCircle } from 'lucide-react';
import { usuarioService } from '../../admin/services/usuarioService';
import { inscripcionService } from '../../admin/services/inscripcionService';
import type { DisciplinaResponse } from '../../types/disciplina.types';
import type { Usuario } from '../../types/usuario.types';
import Button from '../../shared/components/Button';
import { showErrorAlert } from '../../shared/utils/alerts';

interface Props {
  disciplina: DisciplinaResponse;
  onClose: () => void;
  onSuccess: () => void;
}

export default function InscribirEstudianteModal({ disciplina, onClose, onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [estudiante, setEstudiante] = useState<Usuario | null>(null);
  const [buscando, setBuscando] = useState(false);
  const [inscribiendo, setInscribiendo] = useState(false);

  // Paso 1: Buscar al usuario por email para obtener su ID
  const buscarEstudiante = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setBuscando(true);
    try {
      const data = await usuarioService.getUsuarioByEmail(email);
      setEstudiante(data);
    } catch (error) {
      showErrorAlert('No se encontró ningún estudiante con ese correo');
      setEstudiante(null);
    } finally {
      setBuscando(false);
    }
  };

  // Paso 2: Ejecutar la inscripción con los IDs obtenidos
  const ejecutarInscripcion = async () => {
    if (!estudiante) return;

    setInscribiendo(true);
    try {
      await inscripcionService.inscribirUsuario({
        usuarioId: estudiante.id,
        disciplinaId: disciplina.id
      });
      onSuccess();
    } catch (error) {
      showErrorAlert('El estudiante ya podría estar inscrito en esta disciplina');
    } finally {
      setInscribiendo(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-4xl w-full max-w-lg overflow-hidden shadow-2xl">
        <div className="p-8">
          <h2 className="text-2xl font-black text-slate-900 mb-2">Inscripción Manual</h2>
          <p className="text-slate-500 text-sm mb-6">
            Inscribiendo en: <span className="font-bold text-indigo-600">{disciplina.nombre}</span>
          </p>

          {/* Buscador de Estudiante */}
          <form onSubmit={buscarEstudiante} className="flex gap-2 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="email"
                placeholder="Correo del estudiante..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" variant="secondary" disabled={buscando}>
              {buscando ? <Loader2 className="animate-spin" size={18} /> : 'Buscar'}
            </Button>
          </form>

          {/* Resultado de la Búsqueda y Confirmación */}
          {estudiante && (
            <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-8 animate-in fade-in zoom-in duration-300">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center font-bold">
                  {estudiante.nombreCompleto.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{estudiante.nombreCompleto}</h4>
                  <p className="text-sm text-slate-500">{estudiante.email}</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-indigo-200 flex justify-between items-center">
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Listo para inscribir</span>
                <CheckCircle className="text-emerald-500" size={20} />
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <button 
              onClick={onClose}
              className="flex-1 py-3 font-bold text-slate-400 hover:text-slate-600 transition-colors"
            >
              Cancelar
            </button>
            <Button 
              onClick={ejecutarInscripcion} 
              variant="primary" 
              className="flex-1"
              disabled={!estudiante || inscribiendo}
            >
              {inscribiendo ? <Loader2 className="animate-spin" size={20} /> : 'Confirmar Inscripción'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}