import { useState, useEffect } from 'react';
import { Trophy, Loader2 } from 'lucide-react';
import { disciplinaService } from "../../services/disciplinaService";
import Card from "../../shared/components/Card";

export default function TotalDisciplinasCard() {
  const [total, setTotal] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotal = async () => {
      try {
        // Consumimos el endpoint de la lista completa
        const data = await disciplinaService.listarDisciplinas();
        // La cantidad es simplemente el largo del arreglo
        setTotal(data.length);
      } catch (error) {
        console.error("Error al obtener total de disciplinas:", error);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    fetchTotal();
  }, []);

  return (
    <Card hoverable className="border-l-4 border-purple-500 overflow-hidden relative group">
      <div className="flex items-center p-1">
        <div className="p-4 bg-linear-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg shadow-purple-500/30 text-white z-10">
          <Trophy size={32} />
        </div>
        
        <div className="ml-5 z-10">
          <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">
            Disciplinas Totales
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
      
      {/* Decoración de fondo con el icono */}
      <div className="absolute -right-4 -bottom-4 opacity-5 text-neutral-900 group-hover:scale-110 transition-transform">
        <Trophy size={80} />
      </div>
    </Card>
  );
}