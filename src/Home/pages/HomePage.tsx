import { useEffect, useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import { disciplinaService } from '../../services/disciplinaService';
import type { DisciplinaResponse } from '../../types/disciplina.types';
import { Trophy, Award, Users, TrendingUp } from 'lucide-react';

export default function HomePage() {
  const [disciplinas, setDisciplinas] = useState<DisciplinaResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarDisciplinas();
  }, []);

  const cargarDisciplinas = async () => {
    try {
      const data = await disciplinaService.listarDisciplinas();
      setDisciplinas(data);
    } catch (error) {
      console.error('Error al cargar disciplinas:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <HeroSection />

      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              Nuestras <span className="text-green-600">Disciplinas Deportivas</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre las disciplinas deportivas que ofrecemos en la Universidad de Sonsonate
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                  <div className="h-72 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {disciplinas.map((disciplina) => (
                <div
                  key={disciplina.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                >
                  <div className="relative h-72 bg-gradient-to-br from-green-500 to-green-700 overflow-hidden">
                    {disciplina.imagenUrl ? (
                      <img
                        src={disciplina.imagenUrl}
                        alt={disciplina.nombre}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Trophy className="w-24 h-24 text-white/80" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {disciplina.nombre}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Award className="w-4 h-4" />
                      <span>Disciplina Deportiva</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
                Sobre la <span className="text-green-400">Unidad Deportiva</span>
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                La Unidad Deportiva de la Universidad de Sonsonate es el corazón del desarrollo atlético institucional. 
                Nos dedicamos a formar atletas integrales, promoviendo valores como la disciplina, el trabajo en equipo 
                y la excelencia deportiva.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Bajo la dirección de profesionales experimentados, ofrecemos instalaciones de primer nivel y 
                programas deportivos que impulsan el crecimiento personal y competitivo de nuestros estudiantes.
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <Users className="w-10 h-10 text-green-400 mb-3" />
                  <h4 className="font-bold text-2xl mb-1">500+</h4>
                  <p className="text-sm text-gray-400">Estudiantes Activos</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <Trophy className="w-10 h-10 text-green-400 mb-3" />
                  <h4 className="font-bold text-2xl mb-1">{disciplinas.length}+</h4>
                  <p className="text-sm text-gray-400">Disciplinas Deportivas</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-2xl p-8 shadow-xl">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                    <TrendingUp className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Gustavo Cortez</h3>
                    <p className="text-sm text-green-50 mb-3">
                      Director de la Unidad Deportiva
                    </p>
                    <p className="text-sm text-white/90 leading-relaxed">
                      Con más de 15 años de experiencia en gestión deportiva universitaria, Gustavo ha liderado 
                      innumerables proyectos exitosos, consolidando nuestra unidad como referente nacional en 
                      formación atlética y desarrollo deportivo integral.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-green-500/20">
                <img 
                  src="https://res.cloudinary.com/dsqrou8bl/image/upload/v1770186093/tavo_ckl3fi.png"
                  alt="Gustavo Cortez - Director de la Unidad Deportiva"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-green-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-green-400/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Universidad de <span className="text-green-600">Sonsonate</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Institución comprometida con la excelencia académica y deportiva, formando profesionales integrales 
            que contribuyen al desarrollo de la sociedad salvadoreña. Nuestro enfoque en el deporte como 
            herramienta de formación complementa la preparación académica de nuestros estudiantes.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-8 border border-green-200">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Excelencia Académica</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Programas académicos de alta calidad que preparan a nuestros estudiantes para los desafíos del futuro.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-8 border border-green-200">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Formación Deportiva</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Desarrollo integral a través del deporte, promoviendo valores y habilidades para la vida.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-8 border border-green-200">
              <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-3 text-gray-900">Comunidad Unida</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Una familia universitaria comprometida con el crecimiento y bienestar de todos sus miembros.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            &copy; 2026 Universidad de Sonsonate - Unidad Deportiva. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}