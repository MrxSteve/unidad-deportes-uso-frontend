import { authService } from '../services/authService';
import usoLogo from '../../assets/logo-uso.png'; 
import heroImage from '../../assets/logoVoleyLogin.png'; 

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      
      <div className="flex w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden min-h-[600px]">
       
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center relative bg-white">
          
          <div className="w-full max-w-sm mx-auto flex flex-col items-center">

            <div className="mb-10">
              <img 
                src={usoLogo} 
                alt="Logo USO" 
                className="h-24 w-auto object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-gray-800 tracking-tight mb-3">
                Sistema Deportivo
              </h1>
              <p className="text-base text-gray-600 font-medium">
                Gestión de Actividades
              </p>
            </div>

            <div className="w-full bg-gradient-to-r from-blue-50 to-green-50 border border-blue-100 rounded-xl p-5 mb-10 flex items-center gap-4">
              <div className="flex-shrink-0 bg-white p-2.5 rounded-lg text-blue-600 shadow-sm">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-gray-800 mb-1">Acceso Institucional</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Usa tu correo <span className="font-semibold text-blue-700">@uso.edu.sv</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => authService.loginWithMicrosoft()}
              className="w-full flex items-center justify-center gap-3 bg-[#2F2F2F] hover:bg-gray-900 text-white py-4 px-5 rounded-xl font-semibold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <svg className="w-6 h-6" viewBox="0 0 21 21" fill="none">
                <path d="M10 0H0V10H10V0Z" fill="#F25022"/>
                <path d="M21 0H11V10H21V0Z" fill="#7FBA00"/>
                <path d="M10 11H0V21H10V11Z" fill="#00A4EF"/>
                <path d="M21 11H11V21H21V11Z" fill="#FFB900"/>
              </svg>
              <span>Continuar con Microsoft</span>
            </button>

            <div className="mt-10 text-center">
               <p className="text-xs text-gray-500 mb-6">
                  Al ingresar aceptas los <a href="#" className="underline hover:text-gray-600 font-semibold">términos y condiciones</a>.
               </p>
               <div className="border-t border-gray-100 pt-6 w-full">
                  <a href="#" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">
                    ¿Necesitas ayuda? <span className="ml-1.5 underline">Soporte</span>
                  </a>
               </div>
            </div>

          </div>
        </div>

        <div className="hidden lg:block lg:w-1/2 relative bg-gray-100">
           <img 
             src={heroImage} 
             alt="Voleibol USO" 
             className="absolute inset-0 w-full h-full object-cover"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90"></div>
           <div className="absolute bottom-0 left-0 p-12 text-white">
             <div className="mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-xs font-bold uppercase tracking-wider">
                  Comunidad Universitaria
                </span>
             </div>
             <h2 className="text-3xl font-bold mb-3 leading-tight">
               Pasión por el deporte,<br/>orgullo <span className="text-green-400">USO</span>.
             </h2>
             <p className="text-gray-300 text-sm leading-relaxed max-w-sm">
               Fomentando el desarrollo integral, la disciplina y el trabajo en equipo de nuestros estudiantes.
             </p>
           </div>
        </div>

      </div>
    </div>
  );
}