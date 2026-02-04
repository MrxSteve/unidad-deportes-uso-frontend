import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Building2, Phone, Calendar, IdCard } from "lucide-react";
import DashboardLayout from "../../shared/components/DashboardLayout";
import { useAuthStore } from "../../stores/authStore";
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
  const navigate = useNavigate();
  const { usuario } = useAuthStore();
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
        const [carrerasData, perfilData] = await Promise.all([
          carreraService.getCarreras(),
          carreraService.getMe()
        ]);
        
        setCarreras(carrerasData);
        
        if (perfilData) {
          setFormData({
            expediente: perfilData.expediente || "",
            codigo: perfilData.codigo || "",
            telefono: perfilData.telefono || "",
            genero: perfilData.genero || "",
            fechaNacimiento: perfilData.fechaNacimiento 
              ? perfilData.fechaNacimiento.split('T')[0] 
              : "",
            carreraId: perfilData.carrera?.id || 0,
          });
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
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
      await Swal.fire({
        title: "¡Perfil Actualizado!",
        text: "Tu información se ha guardado correctamente.",
        icon: "success",
        confirmButtonColor: "#1d4ed8",
      });
      navigate('/perfil');
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el perfil.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto animate-fade-in">
        <Card className="shadow-2xl border-none overflow-hidden">
          <div className="h-2 bg-linear-to-r from-primary-500 via-secondary-500 to-primary-600"></div>
          <CardHeader className="bg-linear-to-br from-neutral-50 to-white p-8">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-linear-to-br from-primary-500 to-primary-600 rounded-2xl text-white shadow-lg">
                <User className="w-7 h-7" />
              </div>
              <div className="flex-1">
                <CardTitle className="text-2xl font-bold text-neutral-800 mb-1">
                  Editar Perfil
                </CardTitle>
                <p className="text-sm text-neutral-600">
                  Actualiza tu información personal y académica
                </p>
                {usuario?.nombreCompleto && (
                  <p className="text-xs text-neutral-500 mt-2 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Editando perfil de {usuario.nombreCompleto}
                  </p>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Sección: Identificación Académica */}
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-sm font-bold text-neutral-700 uppercase tracking-wide">
                    Identificación Académica
                  </h3>
                  <div className="flex-1 h-px bg-neutral-200"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700 mb-2">
                      <IdCard className="w-4 h-4 text-neutral-500" />
                      Expediente <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="expediente"
                      value={formData.expediente}
                      onChange={handleChange}
                      placeholder="Ej: 25655"
                      className="hover:border-primary-400 focus:border-primary-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700 mb-2">
                      <IdCard className="w-4 h-4 text-neutral-500" />
                      Código de Estudiante <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="codigo"
                      value={formData.codigo}
                      onChange={handleChange}
                      placeholder="Ej: MG22i04001"
                      className="hover:border-primary-400 focus:border-primary-500 transition-colors"
                      required
                    />
                  </div>
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
              <div className="space-y-5 pt-2">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <h3 className="text-sm font-bold text-neutral-700 uppercase tracking-wide">
                    Información Personal
                  </h3>
                  <div className="flex-1 h-px bg-neutral-200"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700 mb-2">
                      <Phone className="w-4 h-4 text-neutral-500" />
                      Teléfono <span className="text-red-500">*</span>
                    </label>
                    <Input
                      name="telefono"
                      type="tel"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="Ej: 7890-1234"
                      className="hover:border-primary-400 focus:border-primary-500 transition-colors"
                      required
                    />
                  </div>
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

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-neutral-700 mb-2">
                    <Calendar className="w-4 h-4 text-neutral-500" />
                    Fecha de Nacimiento <span className="text-red-500">*</span>
                  </label>
                  <Input
                    name="fechaNacimiento"
                    type="date"
                    value={formData.fechaNacimiento}
                    onChange={handleChange}
                    max={new Date().toISOString().split('T')[0]}
                    className="w-full hover:border-primary-400 focus:border-primary-500 transition-colors"
                    required
                  />
                  <p className="text-xs text-neutral-500 mt-1.5">Solo se permiten fechas pasadas</p>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex items-center justify-between gap-4 pt-8 mt-2 border-t-2 border-neutral-100">
                <p className="text-xs text-neutral-500 flex items-center gap-1">
                  <span className="text-red-500">*</span> Campos obligatorios
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    type="button"
                    onClick={() => navigate('/perfil')}
                    disabled={submitting}
                    className="px-6 py-2.5 rounded-xl hover:bg-neutral-100 border-2 font-semibold transition-all"
                  >
                    Cancelar
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    isLoading={submitting}
                    disabled={submitting}
                    className="px-8 py-2.5 rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 active:scale-95 transition-all font-bold"
                  >
                    {submitting ? "Guardando..." : "💾 Guardar Cambios"}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
