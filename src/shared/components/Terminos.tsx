import Swal from 'sweetalert2';

export const Terminos = () => {
  Swal.fire({
    title: '<span class="text-2xl font-black text-green-600">Términos y Condiciones</span>',
    html: `
      <div class="text-left text-sm space-y-4 text-gray-700 leading-relaxed">
        <p>
          Bienvenido al <strong>Sistema Unidad Deportiva</strong>. Al utilizar este portal, aceptas las siguientes condiciones:
        </p>
        <ul class="list-disc pl-5 space-y-2">
          <li><strong>Propósito:</strong> Este sitio es exclusivo para la gestión administrativa deportiva (asistencias y registros) de los estudiantes de la Universidad de Sonsonate.</li>
          <li><strong>Privacidad:</strong> El sistema actúa como un puente de gestión y no almacena datos personales sensibles fuera de los fines académicos y deportivos previstos.</li>
          <li><strong>Responsabilidad:</strong> Los desarrolladores y la administración no se hacen responsables por malentendidos, errores en el ingreso de datos por parte del usuario o mal uso de la plataforma.</li>
          <li><strong>Uso Institucional:</strong> El acceso está restringido a usuarios con credenciales oficiales @usonsonate.edu.sv.</li>
        </ul>
      </div>
    `,
    icon: 'info',
    confirmButtonText: 'He leído y acepto',
    confirmButtonColor: '#16a34a', // green-600
    background: '#ffffff',
    customClass: {
      popup: 'rounded-3xl',
      confirmButton: 'rounded-xl px-8 py-3 font-bold'
    },
    showClass: {
      popup: 'animate__animated animate__fadeInUp animate__faster'
    }
  });
};