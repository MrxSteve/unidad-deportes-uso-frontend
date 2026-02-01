import { useState, useRef } from 'react';
import Button from '../../../shared/components/Button';
import Input from '../../../shared/components/Input';
import { disciplinaService } from '../../../services/disciplinaService';
import { showErrorAlert, showSuccessAlert } from '../../../shared/utils/alerts';

interface CrearDisciplinaModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CrearDisciplinaModal({ onClose, onSuccess }: CrearDisciplinaModalProps) {
  const [nombre, setNombre] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImagenChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        showErrorAlert('Por favor selecciona un archivo de imagen');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        showErrorAlert('La imagen no debe superar los 10MB');
        return;
      }
      setImagen(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nombre.trim()) {
      showErrorAlert('El nombre es obligatorio');
      return;
    }

    try {
      setLoading(true);
      await disciplinaService.crearDisciplinaConImagen(nombre, imagen || undefined);
      showSuccessAlert('Disciplina creada exitosamente');
      onSuccess();
    } catch (error: any) {
      showErrorAlert(error.response?.data?.message || 'Error al crear disciplina');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gradient-to-r from-primary-500 to-secondary-500 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Nueva Disciplina</h2>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Nombre de la disciplina *
            </label>
            <Input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: Fútbol, Baloncesto, Natación..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-neutral-700 mb-2">
              Imagen (opcional)
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImagenChange}
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-neutral-300 rounded-xl p-6 text-center cursor-pointer hover:border-primary-500 transition-colors"
            >
              {previewUrl ? (
                <div className="space-y-3">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <p className="text-sm text-neutral-600">Click para cambiar imagen</p>
                </div>
              ) : (
                <>
                  <svg className="w-12 h-12 mx-auto text-neutral-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-neutral-600 font-medium">Click para seleccionar imagen</p>
                  <p className="text-sm text-neutral-500 mt-1">JPEG, PNG, GIF - Máx 10MB</p>
                </>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="secondary"
              className="flex-1"
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={loading}
            >
              {loading ? 'Creando...' : 'Crear Disciplina'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
