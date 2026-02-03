import { useState, useEffect } from 'react';
import { Users, Loader2 } from 'lucide-react';
import { usuarioService } from "../services/usuarioService";
import Card from "../../shared/components/Card";

export default function TotalUsuariosCard() {
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        const count = await usuarioService.getContarTodos();
        setTotal(count);
      } catch (error) {
        console.error("Error al obtener total de usuarios:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotal();
  }, []);

  return (
    <Card hoverable className="border-l-4 border-red-500 overflow-hidden relative">
      <div className="flex items-center p-1">
        <div className="p-4 bg-linear-to-br from-red-500 to-red-600 rounded-2xl shadow-lg shadow-red-500/30 text-white">
          <Users size={32} />
        </div>
        
        <div className="ml-5">
          <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">
            Total Usuarios
          </p>
          
          <div className="flex items-baseline gap-2">
            {loading ? (
              <Loader2 className="animate-spin text-neutral-300 mt-2" size={24} />
            ) : (
              <p className="text-3xl font-black text-neutral-800 mt-1">
                {total ?? 0}
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Decoración sutil de fondo */}
      <div className="absolute -right-4 -bottom-4 opacity-5 text-neutral-900">
        <Users size={80} />
      </div>
    </Card>
  );
}