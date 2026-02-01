import Swal from 'sweetalert2';

export const SoporteTec = () => {
  Swal.fire({
    title: '<span class="text-2xl font-black text-blue-700">Soporte Técnico</span>',
    html: `
      <div class="text-center space-y-4">
        <p className="text-gray-600">
          ¿Tienes problemas con la <strong>Unidad Deportes</strong>? 
          Contacta con el equipo de soporte tecnico.
        </p>
        
        <div class="mt-6 space-y-3">
          <div class="bg-slate-50 p-4 rounded-xl border border-blue-100 shadow-sm flex flex-col items-center">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Ingeniero Geofrey Muñoz</span>
            <a href="tel:+50361572882" class="text-xl font-black text-blue-600 hover:underline">6157-2882</a>
          </div>
          
          <div class="bg-slate-50 p-4 rounded-xl border border-blue-100 shadow-sm flex flex-col items-center">
            <span class="text-xs font-bold text-gray-400 uppercase tracking-widest">Ingeniero Ismael Garcia</span>
            <a href="tel:+50370526354" class="text-xl font-black text-blue-600 hover:underline">7052-6354</a>
          </div>
        </div>

        <p class="text-[10px] text-gray-400 mt-4">
          Horario de atención: Lunes a Viernes - 8:00 AM a 5:00 PM
        </p>
      </div>
    `,
    icon: 'question',
    showCloseButton: true,
    confirmButtonText: 'Entendido',
    confirmButtonColor: '#1d4ed8', // blue-700
    customClass: {
      popup: 'rounded-3xl',
      confirmButton: 'rounded-xl px-10 py-3 font-bold'
    }
  });
};