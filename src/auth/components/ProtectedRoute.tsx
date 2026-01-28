import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { authService } from '../services/authService';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { usuario, isLoading, setUsuario, setLoading } = useAuthStore();

  useEffect(() => {
    const loadUser = async () => {
      if (!authService.isAuthenticated()) {
        setLoading(false);
        setUsuario(null);
        return;
      }

      try {
        const user = await authService.getCurrentUser();
        setUsuario(user);
      } catch (error) {
        console.error('Error al cargar usuario:', error);
        localStorage.clear();
        setUsuario(null);
      } finally {
        setLoading(false);
      }
    };

    if (!usuario && authService.isAuthenticated()) {
      loadUser();
    } else if (!authService.isAuthenticated()) {
      setLoading(false);
      setUsuario(null);
    }
  }, [usuario, setUsuario, setLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p className="text-neutral-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
