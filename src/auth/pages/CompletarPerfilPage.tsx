import { useState, useEffect } from "react";
import MainLayout from "../../shared/components/MainLayout";
import Card, {
  CardHeader,
  CardTitle,
  CardContent,
} from "../../shared/components/Card";
import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";
import { carreraService } from "../../auth/services/perfilService";
import type { Carrera, PerfilUpdateDTO } from "../../types/perfil.types";
import Swal from "sweetalert2";

export default function CompletarPerfilPage() {
  const [carreras, setCarreras] = useState<Carrera[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<PerfilUpdateDTO>({
    expediente: "",
    codigo: "",
    telefono: "",
    genero: "",
    fechaNacimiento: "",
    carreraId: 0,
  });

  useEffect(() => {
    const initData = async () => {
      try {
        // Usamos el nuevo método del servicio unificado
        const data = await carreraService.getCarreras();
        setCarreras(data);
      } catch (error) {
        console.error("Error cargando carreras:", error);
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  // 3. Manejador de cambios para los inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "carreraId" ? Number(value) : value,
    }));
  };

  // 4. Función para guardar los cambios
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await carreraService.updateMe(formData);
      Swal.fire({
        title: "¡Perfil Actualizado!",
        text: "Tu información se ha guardado correctamente.",
        icon: "success",
        confirmButtonColor: "#1d4ed8",
      });
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el perfil.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto animate-fade-in">
        <Card className="shadow-xl border-none ring-1 ring-neutral-200">
          <CardHeader className="border-b border-neutral-100 bg-neutral-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary-600 rounded-lg text-white">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <CardTitle className="text-xl font-bold text-neutral-800">
                  Información Personal
                </CardTitle>
                <p className="text-sm text-neutral-500">
                  Completa los datos para personalizar tu experiencia
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Sección: Identificación Académica */}
              <div className="space-y-4">
                <h3 className="text-xs font-semibold text-primary-600 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-8 h-px bg-primary-200"></span>{" "}
                  Identificación Académica
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Expediente"
                    name="expediente"
                    value={formData.expediente}
                    onChange={handleChange}
                    placeholder="Ej: 25655"
                    className="hover:border-primary-300 transition-colors"
                    required
                  />
                  <Input
                    label="Código de Estudiante"
                    name="codigo"
                    value={formData.codigo}
                    onChange={handleChange}
                    placeholder="Ej: MG22i04001"
                    className="hover:border-primary-300 transition-colors"
                    required
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                    Carrera <span className="text-primary-500 ml-0.5">*</span>
                  </label>
                  <div className="relative group">
                    <select
                      name="carreraId"
                      value={formData.carreraId || ""}
                      onChange={handleChange}
                      className="appearance-none w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all cursor-pointer disabled:bg-neutral-50 disabled:text-neutral-400"
                      required
                      disabled={loading}
                    >
                      <option value="" disabled>
                        {loading
                          ? "Cargando catálogo..."
                          : "Selecciona tu especialidad"}
                      </option>
                      {carreras.map((carrera) => (
                        <option key={carrera.id} value={carrera.id}>
                          {carrera.nombre}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-neutral-400 group-hover:text-primary-500 transition-colors">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M19 9l-7 7-7-7"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección: Datos de Contacto y Perfil */}
              <div className="space-y-4 pt-4">
                <h3 className="text-xs font-semibold text-primary-600 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-8 h-px bg-primary-200"></span> Contacto y
                  Biografía
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Teléfono"
                    name="telefono"
                    type="tel"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="Ej: 7890-1234"
                    required
                  />
                  <div className="relative">
                    <label className="block text-sm font-semibold text-neutral-700 mb-1.5">
                      Género <span className="text-primary-500 ml-0.5">*</span>
                    </label>
                    <div className="relative group">
                      <select
                        name="genero"
                        value={formData.genero}
                        onChange={handleChange}
                        className="appearance-none w-full px-4 py-2.5 bg-white border border-neutral-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all cursor-pointer"
                        required
                      >
                        <option value="">Seleccionar...</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                        <option value="OTRO">Otro</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-neutral-400 group-hover:text-primary-500">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M19 9l-7 7-7-7"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <Input
                  label="Fecha de Nacimiento"
                  name="fechaNacimiento"
                  type="date"
                  value={formData.fechaNacimiento}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>

              {/* Acciones */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-neutral-100">
                <Button
                  variant="outline"
                  type="button"
                  disabled={submitting}
                  className="px-6 rounded-xl hover:bg-neutral-100 transition-colors"
                >
                  Cancelar
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  isLoading={submitting}
                  className="px-8 rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40 active:scale-95 transition-all font-bold"
                >
                  {submitting ? "Guardando..." : "Finalizar Perfil"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
