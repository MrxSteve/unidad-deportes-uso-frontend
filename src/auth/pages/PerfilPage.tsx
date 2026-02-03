import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Shield, BookOpen, Phone, Calendar, MapPin, Edit } from "lucide-react";
import DashboardLayout from "../../shared/components/DashboardLayout";
import Card, { CardHeader, CardTitle, CardContent } from "../../shared/components/Card";
import Button from "../../shared/components/Button";
import { useAuthStore } from "../../stores/authStore";
import { getRoleColor, getRoleLabel } from "../utils/roleUtils";
import { carreraService } from "../../auth/services/perfilService";
import type { PerfilMeResponse } from "../../types/perfil.types";

export default function PerfilPage() {
  const { usuario } = useAuthStore();
  const navigate = useNavigate();
  const [perfilDetalle, setPerfilDetalle] = useState<PerfilMeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const data = await carreraService.getMe();
        setPerfilDetalle(data);
      } catch (error) {
        console.error("Error al cargar perfil:", error);
      } finally {
        setLoading(false);
      }
    };
    if (usuario) cargarPerfil();
  }, [usuario]);

  if (!usuario) return null;

  const formatearFecha = (fecha?: string) => {
    if (!fecha) return "No especificado";
    return new Date(fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getGeneroLabel = (g?: string) => {
    if (g === 'M') return 'Masculino';
    if (g === 'F') return 'Femenino';
    return g || 'No especificado';
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <Card className="border-none shadow-xl overflow-hidden">
          <div className="relative h-32 bg-gradient-to-r from-primary-500 to-secondary-500">
            <div className="absolute inset-0 bg-black/5"></div>
          </div>
          <CardContent className="relative -mt-16 px-6 pb-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-4">
              <div className="relative">
                <div className="h-32 w-32 rounded-full p-1 bg-white shadow-xl">
                  {usuario.fotoUrl ? (
                    <img 
                      src={usuario.fotoUrl} 
                      alt="Perfil" 
                      className="w-full h-full rounded-full object-cover border-4 border-white"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-4xl font-bold text-white border-4 border-white">
                      {usuario.nombreCompleto.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 border-4 border-white rounded-full"></div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-neutral-800">{usuario.nombreCompleto}</h1>
                <p className="text-neutral-600 mt-1 flex items-center justify-center md:justify-start gap-2">
                  <Mail size={16} />
                  {usuario.email}
                </p>
              </div>

              <Button
                onClick={() => navigate('/completar-perfil')}
                variant="primary"
                className="flex items-center gap-2"
              >
                <Edit size={18} />
                Editar Perfil
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield size={20} className="text-blue-600" />
                Roles del Sistema
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {usuario.roles.map((rol) => (
                  <span
                    key={rol}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold bg-gradient-to-r ${getRoleColor(rol)} text-white shadow-md`}
                  >
                    {getRoleLabel(rol)}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen size={20} className="text-purple-600" />
                Información Académica
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-3">
                  <div className="h-4 bg-neutral-200 rounded animate-pulse"></div>
                  <div className="h-4 bg-neutral-200 rounded animate-pulse w-3/4"></div>
                </div>
              ) : perfilDetalle?.carrera ? (
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-neutral-500 uppercase">Carrera</p>
                    <p className="text-neutral-800 font-medium">{perfilDetalle.carrera.nombre}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-neutral-500 uppercase">Expediente</p>
                    <p className="text-neutral-800 font-mono font-semibold">{perfilDetalle.expediente}</p>
                  </div>
                </div>
              ) : (
                <p className="text-neutral-500 text-sm">No hay información académica registrada</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User size={20} className="text-green-600" />
                Información Personal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Phone size={16} className="text-neutral-400 mt-1" />
                  <div>
                    <p className="text-xs font-semibold text-neutral-500 uppercase">Teléfono</p>
                    <p className="text-neutral-800 font-medium">
                      {perfilDetalle?.telefono || 'No especificado'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar size={16} className="text-neutral-400 mt-1" />
                  <div>
                    <p className="text-xs font-semibold text-neutral-500 uppercase">Fecha de Nacimiento</p>
                    <p className="text-neutral-800 font-medium">
                      {formatearFecha(perfilDetalle?.fechaNacimiento)}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <User size={16} className="text-neutral-400 mt-1" />
                  <div>
                    <p className="text-xs font-semibold text-neutral-500 uppercase">Género</p>
                    <p className="text-neutral-800 font-medium">
                      {getGeneroLabel(perfilDetalle?.genero)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin size={20} className="text-orange-600" />
                Estado del Perfil
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                {usuario.perfilCompleto ? (
                  <>
                    <div className="p-3 bg-green-100 rounded-full">
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-green-700">Perfil Completo</p>
                      <p className="text-sm text-neutral-600">Toda tu información está actualizada</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3 bg-orange-100 rounded-full">
                      <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-orange-700">Perfil Incompleto</p>
                      <p className="text-sm text-neutral-600">Completa tu información personal</p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}