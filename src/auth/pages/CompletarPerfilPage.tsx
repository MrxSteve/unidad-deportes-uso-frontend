import MainLayout from '../../shared/components/MainLayout';
import Card, { CardHeader, CardTitle, CardContent } from '../../shared/components/Card';
import Input from '../../shared/components/Input';
import Button from '../../shared/components/Button';

export default function CompletarPerfilPage() {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-6 bg-orange-50 border-l-4 border-orange-500 p-4 rounded">
          <div className="flex items-start">
            <svg className="w-6 h-6 text-orange-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-orange-800 font-medium">Completa tu perfil</h3>
              <p className="text-orange-700 text-sm mt-1">
                Para acceder a todas las funciones del sistema, necesitas completar tu información personal.
              </p>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Información Personal</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Expediente"
                  type="text"
                  placeholder="Ej: 202012345"
                  required
                />
                <Input
                  label="Código de Estudiante"
                  type="text"
                  placeholder="Ej: ST20001"
                  required
                />
              </div>

              <Input
                label="Carrera"
                type="text"
                placeholder="Ej: Ingeniería en Sistemas"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Teléfono"
                  type="tel"
                  placeholder="Ej: 7890-1234"
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1">
                    Género <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option value="">Seleccionar...</option>
                    <option value="MASCULINO">Masculino</option>
                    <option value="FEMENINO">Femenino</option>
                    <option value="OTRO">Otro</option>
                  </select>
                </div>
              </div>

              <Input
                label="Fecha de Nacimiento"
                type="date"
                required
              />

              <div className="flex justify-end space-x-4 pt-4">
                <Button variant="outline" type="button">
                  Cancelar
                </Button>
                <Button variant="primary" type="submit">
                  Guardar Perfil
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
