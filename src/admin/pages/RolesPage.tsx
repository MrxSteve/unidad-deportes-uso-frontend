import { useState } from 'react';
import { Search, User, Mail, ShieldCheck, Loader2, Fingerprint, LayoutGrid } from 'lucide-react';
import { usuarioService } from "../services/usuarioService";
import { UserRolesManager } from "../components/UserRolesManager";
import { showErrorAlert } from "../../shared/utils/alerts";
import DashboardLayout from "../../shared/components/DashboardLayout";

export default function RolesPage() {
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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
      <div className="max-w-5xl mx-auto py-8 md:py-14 px-4 sm:px-6 lg:px-8 relative">
        
        {/* Header: Tipografía Slate/Indigo */}
        <header className="mb-10 text-center md:text-left">
          <div className="inline-flex items-center justify-center p-2.5 bg-indigo-50 rounded-2xl mb-4 text-indigo-600 shadow-sm shadow-indigo-100">
            <Fingerprint size={28} />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Gestión de <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-violet-500">Permisos</span>
          </h1>
          <p className="text-slate-500 mt-3 text-lg max-w-2xl">
            Controla los accesos y niveles de seguridad de los usuarios registrados.
          </p>
        </header>

        {/* Buscador: Diseño Robusto */}
        <form onSubmit={handleSearch} className="relative mb-12">
          <div className="relative flex flex-col md:flex-row items-stretch gap-3">
            <div className="relative flex-1 group">
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                <Search size={22} />
              </div>
              <input 
                type="email" 
                placeholder="Busca por correo institucional..." 
                className="w-full pl-14 pr-6 py-5 bg-white rounded-2xl shadow-sm border border-slate-200 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-800 text-lg placeholder:text-slate-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button 
              disabled={loading}
              className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-5 rounded-2xl font-bold transition-all shadow-xl shadow-slate-200 active:scale-95 flex justify-center items-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Buscar Usuario'}
            </button>
          </div>
        </form>

        <div className="w-full">
          {usuario ? (
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
              
              {/* Cabecera del Resultado: Contraste Indigo/Slate */}
              <div className="bg-slate-50/50 px-8 py-10 md:px-12 border-b border-slate-100 flex flex-col sm:flex-row items-center gap-6">
                <div className="relative group">
                    <div className="h-20 w-20 bg-indigo-600 text-white rounded-[1.5rem] flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:scale-105 transition-transform">
                        <User size={36} strokeWidth={1.5} />
                    </div>
                    <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 border-4 border-white rounded-full"></div>
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 truncate uppercase tracking-tight">
                    {usuario.nombreCompleto}
                  </h2>
                  <div className="flex items-center justify-center sm:justify-start text-slate-500 mt-1.5 font-medium">
                    <Mail size={16} className="mr-2 opacity-70" />
                    <span className="text-sm md:text-base">{usuario.email}</span>
                  </div>
                </div>

                <div className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-4 py-2 rounded-xl border border-emerald-100 tracking-widest uppercase">
                  Miembro Activo
                </div>
              </div>

              {/* Sección de Privilegios */}
              <div className="p-8 md:p-12">
                 <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
                            <ShieldCheck size={24} />
                        </div>
                        <h3 className="font-bold text-slate-800 text-xl tracking-tight">Privilegios y Roles</h3>
                    </div>
                 </div>
                 
                 <div className="bg-slate-50/80 rounded-4xl p-4 md:p-10 border border-slate-100 shadow-inner">
                    <UserRolesManager usuarioId={usuario.id} rolesActuales={usuario.roles} />
                 </div>
              </div>
            </div>
          ) : (
            !loading && (
              <div className="py-24 border-2 border-dashed border-slate-200 rounded-[3rem] text-center px-4 bg-slate-50/20 group hover:border-indigo-300 transition-colors">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-slate-100 group-hover:rotate-6 transition-transform">
                    <LayoutGrid size={32} className="text-slate-300 group-hover:text-indigo-400 transition-colors" />
                </div>
                <h3 className="text-slate-900 font-bold text-xl">Panel Vacío</h3>
                <p className="text-slate-400 mt-2 text-sm max-w-xs mx-auto">
                  Utiliza la barra superior para buscar un usuario y definir sus responsabilidades en el sistema.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}