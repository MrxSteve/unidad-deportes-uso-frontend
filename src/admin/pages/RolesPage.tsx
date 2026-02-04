import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowLeft, User, Mail, ShieldAlert, Loader2 } from 'lucide-react';
import { usuarioService } from "../services/usuarioService";
import { UserRolesManager } from "../components/UserRolesManager";
import { showErrorAlert } from "../../shared/utils/alerts";
import DashboardLayout from "../../shared/components/DashboardLayout";

export default function RolesPage() {
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const data = await usuarioService.getUsuarioByEmail(email);
      setUsuario(data);
    } catch {
      showErrorAlert("No encontrado", "Verifica el correo ingresado.");
      setUsuario(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto py-6 md:py-12 px-4 md:px-6 relative">
          
          {/* BOTÓN VOLVER: Adaptable */}
          <div className="lg:absolute lg:-left-16 lg:top-14 mb-6 lg:mb-0">
            <button 
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 lg:gap-0 justify-center min-w-16 lg:min-w-0 lg:w-12 lg:h-12 py-2 px-4 lg:p-0 rounded-2xl lg:rounded-full bg-white border border-neutral-200 text-neutral-500 shadow-sm hover:shadow-md hover:text-primary-600 transition-all group"
            >
              <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-bold lg:hidden">Volver al inicio</span>
            </button>
          </div>

          {/* Header: Centrado en móvil, izquierda en desktop */}
          <header className="mb-8 md:mb-12 text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-black text-secondary-600 tracking-tight leading-tight">
              Gestión de <span className="text-green-500">Roles</span>
            </h1>
            <p className="text-neutral-500 mt-2 text-base md:text-lg">
              Administra los permisos de acceso de los usuarios del sistema.
            </p>
          </header>

          {/* Buscador: Se ajusta el padding y el botón en móvil */}
          <form onSubmit={handleSearch} className="relative mb-10 md:mb-16">
            <div className="relative flex flex-col md:flex-row items-stretch md:items-center gap-3">
              <div className="relative flex-1">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400">
                  <Search size={20} />
                </div>
                <input 
                  type="email" 
                  placeholder="Correo del usuario..." 
                  className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl md:rounded-3xl shadow-sm border border-neutral-200 outline-none focus:border-green-500 transition-all text-neutral-800"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button 
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-green-200 active:scale-95 flex justify-center items-center"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Buscar'}
              </button>
            </div>
          </form>

          {/* Resultado del Usuario / Empty State */}
          <div className="w-full">
            {usuario ? (
              <div className="bg-white rounded-4xl md:rounded-[2.5rem] shadow-xl border border-neutral-100 overflow-hidden">
                {/* Cabecera del resultado adaptable */}
                <div className="bg-neutral-50/50 px-6 py-10 md:px-10 md:py-8 border-b border-neutral-100 flex flex-col sm:flex-row items-center text-center sm:text-left gap-4">
                  <div className="h-16 w-16 bg-green-600 text-white rounded-2xl flex items-center justify-center shrink-0">
                    <User size={30} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl md:text-2xl font-black text-neutral-900 truncate uppercase">
                      {usuario.nombreCompleto}
                    </h2>
                    <div className="flex items-center justify-center sm:justify-start text-neutral-500 mt-1 break-all">
                      <Mail size={14} className="mr-2 shrink-0" />
                      <span className="text-sm md:text-base">{usuario.email}</span>
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-700 text-[10px] font-black px-3 py-1 rounded-lg border border-green-200 shrink-0">
                    ACTIVO
                  </div>
                </div>

                <div className="p-6 md:p-10">
                   {/* ... contenido de UserRolesManager */}
                   <div className="flex items-center space-x-2 mb-6">
                      <ShieldAlert size={20} className="text-green-600" />
                      <h3 className="font-bold text-neutral-800">Privilegios y Roles</h3>
                   </div>
                   <div className="bg-neutral-50 rounded-2xl p-4 md:p-8 border-2 border-dashed border-neutral-200">
                      <UserRolesManager usuarioId={usuario.id} rolesActuales={usuario.roles} />
                   </div>
                </div>
              </div>
            ) : (
              !loading && (
                <div className="py-16 md:py-26 border-2 border-dashed border-neutral-200 rounded-4xl md:rounded-[3rem] text-center px-4">
                  <Search size={40} className="mx-auto text-neutral-300 mb-4" />
                  <h3 className="text-neutral-900 font-bold text-lg">¿A quién buscamos hoy?</h3>
                  <p className="text-neutral-500 mt-2 text-sm max-w-xs mx-auto">
                    Ingresa un correo para gestionar los permisos de un miembro del equipo.
                  </p>
                </div>
              )
            )}
          </div>
        </div>
    </DashboardLayout>
  );
}