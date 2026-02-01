import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { authService } from '../services/authService';
import { toast } from 'react-toastify';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { setUsuario } = useAuthStore();

  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get('access_token');
      const refreshToken = params.get('refresh_token');

      if (!accessToken || !refreshToken) {
        console.error('Tokens no encontrados en la URL');
        toast.error('Error en la autenticación');
        navigate('/login');
        return;
      }

      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      try {
        const usuario = await authService.getCurrentUser();
        setUsuario(usuario);

        toast.success(`¡Bienvenido ${usuario.nombreCompleto}!`);

        if (usuario.perfilCompleto) {
          navigate('/dashboard');
        } else {
          navigate('/completar-perfil');
        }
      } catch (error) {
        console.error('Error al obtener usuario:', error);
        toast.error('Error al cargar tu perfil');
        navigate('/login');
      }
    };

    handleCallback();
  }, [navigate, setUsuario]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary-50 to-secondary-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-500 mx-auto mb-6"></div>
        <h2 className="text-2xl font-bold text-neutral-800 mb-2">Autenticando...</h2>
        <p className="text-neutral-600">Procesando tu sesión de Microsoft</p>
      </div>
    </div>
  );
}
