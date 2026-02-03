import { useState, useEffect } from "react";
import { User, Mail, Shield, BookOpen, Phone, Calendar, Fingerprint } from "lucide-react";
import { useAuthStore } from "../../stores/authStore";
import { getRoleColor, getRoleLabel } from "../utils/roleUtils";
import { carreraService } from "../../auth/services/perfilService";
import type { PerfilMeResponse } from "../../types/perfil.types";
import MainLayout from "../../shared/components/MainLayout";
import Footer from "../../shared/components/Footer";

export default function PerfilPage() {
  const { usuario, activeRole } = useAuthStore();
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
    if (!fecha) return "---";
    return new Date(fecha).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const getGeneroLabel = (g?: string) => {
    if (g === 'M') return 'Masculino';
    if (g === 'F') return 'Femenino';
    return g || 'No especificado';
  };

  return (
    <>
      <MainLayout>
        <div className="max-w-5xl mx-auto pb-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
          
          <div className="relative h-48 md:h-60 rounded-3xl bg-linear-to-r from-primary-600 via-primary-500 to-secondary-500 shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 rounded-full bg-white/10 blur-3xl"></div>
          </div>

          <div className="px-4 md:px-8">
            <div className="relative -mt-16 md:-mt-20 mb-8 flex flex-col md:flex-row items-center md:items-end gap-6">
              
              <div className="relative group">
                <div className="h-32 w-32 md:h-44 md:w-44 rounded-full p-1.5 bg-white shadow-2xl">
                  {usuario.fotoUrl ? (
                    <img src={usuario.fotoUrl} alt="Perfil" className="w-full h-full rounded-full object-cover border-4 border-white bg-neutral-100" />
                  ) : (
                    <div className="w-full h-full rounded-full bg-linear-to-br from-neutral-100 to-neutral-200 flex items-center justify-center text-4xl md:text-5xl font-bold text-neutral-400 border-4 border-white">
                      {usuario.nombreCompleto.charAt(0)}
                    </div>
                  )}
                </div>
                <div className={`absolute bottom-4 right-4 w-6 h-6 border-4 border-white rounded-full ${usuario ? 'bg-green-500' : 'bg-gray-400'} shadow-md`}></div>
              </div>

              <div className="text-center md:text-left flex-1 pb-2">
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                  {usuario.nombreCompleto}
                </h1>
                <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 mt-2 text-neutral-500">
                  <span className="flex items-center gap-1.5 font-medium text-lg">
                    <Mail size={18} />
                    {usuario.email}
                  </span>
                 
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              {/* Tarjeta 1: Roles */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Shield size={24} /></div>
                  <h3 className="font-bold text-gray-800 text-lg">Roles</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {usuario.roles.map((rol) => (
                    <span key={rol} className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider border ${
                        activeRole === rol ? `bg-linear-to-r ${getRoleColor(rol)} text-white border-transparent` : 'bg-gray-50 text-gray-600 border-gray-200'
                      }`}>
                      {getRoleLabel(rol)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tarjeta 2: Académico - CORREGIDA */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl"><BookOpen size={24} /></div>
                  <h3 className="font-bold text-gray-800 text-lg">Académico</h3>
                </div>
                
                {loading ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 w-3/4 rounded"></div>
                    <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
                  </div>
                ) : perfilDetalle ? (
                  <div className="space-y-4 animate-in fade-in">
                    {/* SOLUCIÓN: Usamos ?. para preguntar si existe carrera antes de mostrar */}
                    {perfilDetalle.carrera ? (
                      <>
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Carrera</p>
                          <p className="font-medium text-gray-800 leading-tight">
                            {perfilDetalle.carrera.nombre}
                          </p>
                        
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-400 uppercase mb-1">Expediente</p>
                          <p className="font-mono font-medium text-gray-800 bg-gray-50 inline-block px-2 py-1 rounded border border-gray-100">
                            {perfilDetalle.expediente}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-4 bg-gray-50 rounded-xl">
                        <p className="text-sm text-gray-500 font-medium">No hay carrera asignada.</p>
                        <p className="text-xs text-gray-400 mt-1">Este perfil no es de estudiante.</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">No disponible.</p>
                )}
              </div>

              {/* Tarjeta 3: Personal */}
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-neutral-100 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-green-50 text-green-600 rounded-2xl"><Fingerprint size={24} /></div>
                  <h3 className="font-bold text-gray-800 text-lg">Personal</h3>
                </div>

                {loading ? (
                  <div className="animate-pulse space-y-4">
                     <div className="h-4 bg-gray-200 w-full rounded"></div>
                     <div className="h-4 bg-gray-200 w-2/3 rounded"></div>
                  </div>
                ) : perfilDetalle ? (
                  <div className="space-y-3 animate-in fade-in">
                    <div className="flex items-start gap-3">
                      <Phone size={16} className="text-gray-400 mt-0.5" />
                      <div>
                         <p className="text-xs font-bold text-gray-400 uppercase">Teléfono</p>
                         <p className="font-medium text-gray-800">{perfilDetalle.telefono || 'Sin registrar'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Calendar size={16} className="text-gray-400 mt-0.5" />
                      <div>
                         <p className="text-xs font-bold text-gray-400 uppercase">Nacimiento</p>
                         <p className="font-medium text-gray-800">{formatearFecha(perfilDetalle.fechaNacimiento)}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <User size={16} className="text-gray-400 mt-0.5" />
                      <div>
                         <p className="text-xs font-bold text-gray-400 uppercase">Género</p>
                         <p className="font-medium text-gray-800">{getGeneroLabel(perfilDetalle.genero)}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">No disponible.</p>
                )}
              </div>

            </div>
          </div>
        </div>
      </MainLayout>
      <Footer />
    </>
  );
}