import { authService } from "../services/authService";
import usoLogo from "../../assets/logo-uso.png";
import heroImage from "../../assets/logoVoleyLogin.png";
import { Link } from "react-router-dom";
import { Terminos } from "../../shared/components/Terminos"; 
import { SoporteTec } from "../../shared/components/SoporteTec";

export default function LoginPage() {
  return (
    <div className="h-screen  w-full flex items-center justify-center bg-linear-to-br from-blue-600 to-green-300 p-4 overflow-hidden">
      
      <div className=" min-h-full flex w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden shadow-black/20 ">
        
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center items-center bg-white">
          {/* Reducimos el max-w de sm a xs para que los botones y cuadros sean más cortos */}
          <div className="w-full max-w-xs flex flex-col items-center text-center">
            
            <div className="mb-6">
              <img
                src={usoLogo}
                alt="Logo USO"
                style={{ imageRendering: '-webkit-optimize-contrast' }}
                className="h-16 md:h-20 w-auto object-contain hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="mb-6">
              <h1 className="text-2xl font-black text-gray-900 tracking-tight leading-tight">
                Bienvenido a la <br/> Unidad Deportiva
              </h1>
              <p className="text-sm text-gray-500 font-medium mt-1">
                Gestiona tus actividades con facilidad
              </p>
            </div>

            {/* Este cuadro ahora se verá más compacto */}
            <div className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center gap-3 mb-6 shadow-sm">
              <div className="shrink-0 bg-blue-600 p-2 rounded-lg text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-gray-800 leading-tight">Acceso Institucional</p>
                <p className="text-[10px] text-gray-500 mt-0.5">Usa tu correo @usonsonate.edu.sv</p>
              </div>
            </div>

            <div className="w-full space-y-3">
              <button
                onClick={() => authService.loginWithMicrosoft()}
                className="w-full flex items-center justify-center gap-3 bg-gray-900 hover:bg-black text-white py-3 px-6 rounded-md font-bold text-sm shadow-lg transition-all active:scale-95"
              >
                <svg className="w-5 h-5" viewBox="0 0 21 21">
                  <path d="M10 0H0V10H10V0Z" fill="#F25022" />
                  <path d="M21 0H11V10H21V0Z" fill="#7FBA00" />
                  <path d="M10 11H0V21H10V11Z" fill="#00A4EF" />
                  <path d="M21 11H11V21H21V11Z" fill="#FFB900" />
                </svg>
                <span>Continuar con Microsoft</span>
              </button>

              <Link to="/" className="block">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-6 rounded-md font-bold text-sm transition-all active:scale-95">
                  Volver al Inicio
                </button>
              </Link>
            </div>

            <div className="w-full mt-8">
              <p className="text-[10px] text-gray-400">
                Al ingresar aceptas los{" "}
                <button
                  onClick={(e) => { e.preventDefault(); Terminos(); }}
                  className="underline hover:text-green-600 font-semibold transition-colors cursor-pointer"
                >
                  términos y condiciones
                </button>
              </p>
              
              <div className="border-t border-gray-100 mt-4 pt-4">
                <button
                  onClick={(e) => { e.preventDefault(); SoporteTec(); }}
                  className="inline-flex items-center text-[11px] font-semibold text-gray-400 hover:text-blue-600 transition-colors"
                >
                  ¿Necesitas ayuda?{" "}
                  <span className="ml-1 underline decoration-1 text-blue-600">
                    Soporte Técnico
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block lg:w-1/2 relative">
          <img
            src={heroImage}
            alt="Voleibol USO"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ imageRendering: 'auto' }}
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-10 text-white">
            <div className="mb-4">
              <span className="px-4 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[10px] font-bold uppercase tracking-widest">
                Comunidad Universitaria
              </span>
            </div>
            <h2 className="text-3xl font-black mb-3 leading-tight">
              Pasión por el deporte, <br />
              orgullo <span className="text-green-400">USO</span>.
            </h2>
            <p className="text-gray-300 text-sm leading-relaxed max-w-xs font-light">
              Fomentando el desarrollo integral y el trabajo en equipo de nuestros estudiantes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}