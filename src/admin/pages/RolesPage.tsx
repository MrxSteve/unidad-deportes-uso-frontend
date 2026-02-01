import { useState } from 'react';
import { usuarioService } from "../services/usuarioService";
import { UserRolesManager } from "../components/UserRolesManager";
import { showErrorAlert } from "../../shared/utils/alerts";
import MainLayout from "../../shared/components/MainLayout";

export default function RolesPage() {
  const [email, setEmail] = useState("");
  const [usuario, setUsuario] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <MainLayout>
      <div className="max-w-3xl mx-auto py-8 px-4">
        <form onSubmit={handleSearch} className="mb-8 flex gap-4 bg-white p-4 rounded-3xl shadow-sm border border-neutral-100">
          <input 
            type="email" 
            placeholder="Buscar por email..." 
            className="flex-1 px-4 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="bg-primary-600 text-white px-6 py-2 rounded-2xl font-bold">
            {loading ? '...' : 'Buscar'}
          </button>
        </form>

        {usuario && (
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-neutral-100">
            <h2 className="text-xl font-bold mb-1">{usuario.nombreCompleto}</h2>
            <p className="text-neutral-500 mb-6 text-sm">{usuario.email}</p>
            <UserRolesManager usuarioId={usuario.id} rolesActuales={usuario.roles} />
          </div>
        )}
      </div>
    </MainLayout>
  );
}