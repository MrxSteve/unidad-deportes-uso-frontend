import { authService } from "../services/authService";
import usoLogo from "../../assets/logo-uso.png";
import heroImage from "../../assets/logoVoleyLogin.png";
import { Link } from "react-router-dom";
import { Terminos } from "./Terminos"; // Importamos la alerta
import { SoporteTec } from "./SoporteTec";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-green-300 p-2">
      <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[650px]">
        <div className="w-full lg:w-1/2 p-12 sm:p-20 flex flex-col justify-center items-center bg-white">
          <div className="w-full max-w-sm flex flex-col items-center text-center">
            <div className="mb-10">
              <img
                src={usoLogo}
                alt="Logo USO"
                className="h-24 w-auto object-contain hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="mb-10">
              <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
                Bienvenido a la Unidad Deportiva
              </h1>
              <p className="text-lg text-gray-600 font-medium mt-3">
                Gestiona tus actividades con facilidad
              </p>
            </div>

            <div className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-5 flex items-center gap-6 shadow-sm">
              <div className="flex-shrink-0 bg-blue-600 p-3 rounded-xl text-white shadow-lg">
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-left">
                <p className="text-lg font-bold text-gray-800 leading-tight">
                  Acceso Institucional
                </p>
                <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                  Usa tu correo{" "}
                  <span className="font-semibold text-blue-600">
                    @usonsonate.edu.sv
                  </span>
                </p>
              </div>
            </div>

            <div className="w-full mt-8">
              <button
                onClick={() => authService.loginWithMicrosoft()}
                className="w-full flex items-center justify-center gap-4 bg-gray-900 hover:bg-black text-white py-5 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
              >
                <svg className="w-6 h-6" viewBox="0 0 21 21">
                  <path d="M10 0H0V10H10V0Z" fill="#F25022" />
                  <path d="M21 0H11V10H21V0Z" fill="#7FBA00" />
                  <path d="M10 11H0V21H10V11Z" fill="#00A4EF" />
                  <path d="M21 11H11V21H21V11Z" fill="#FFB900" />
                </svg>
                <span>Continuar con Microsoft</span>
              </button>
            </div>

            <div className="w-full mt-4">
              <Link to="/">
                <button className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-bold text-lg shadow-md hover:shadow-lg transition-all active:scale-95">
                  Volver al Inicio
                </button>
              </Link>
            </div>

            <div className="w-full mt-12 space-y-6">
              <p className="text-xs text-gray-400">
                Al ingresar aceptas los{" "}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    Terminos();
                  }}
                  className="underline hover:text-green-600 font-semibold transition-colors cursor-pointer"
                >
                  términos y condiciones
                </button>
                .
              </p>
              <div className="border-t border-gray-100 pt-8">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    SoporteTec();
                  }}
                  className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors cursor-pointer"
                >
                  ¿Necesitas ayuda?{" "}
                  <span className="ml-2 underline decoration-2 underline-offset-4 text-blue-600">
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
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-16 text-white text-left">
            <div className="mb-6">
              <span className="px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold uppercase tracking-widest text-center">
                Comunidad Universitaria
              </span>
            </div>
            <h2 className="text-5xl font-black mb-6 leading-tight">
              Pasión por el deporte,
              <br />
              orgullo <span className="text-green-400">USO</span>.
            </h2>
            <p className="text-gray-200 text-lg leading-relaxed max-w-md font-light">
              Fomentando el desarrollo integral, la disciplina y el trabajo en
              equipo de nuestros estudiantes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
