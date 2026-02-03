import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Auth Pages
import LoginPage from './auth/pages/LoginPage';
import AuthCallback from './auth/pages/AuthCallback';
import DashboardPage from './auth/pages/DashboardPage';
import CompletarPerfilPage from './auth/pages/CompletarPerfilPage';
import PerfilPage from './auth/pages/PerfilPage';

// Home Page
import HomePage from './Home/pages/HomePage';

// Disciplinas
import DisciplinasPage from './features/disciplinas/pages/DisciplinasPage';

// Components
import ProtectedRoute from './auth/components/ProtectedRoute';

// Admin Roles
import RolesPage from './admin/pages/RolesPage';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <Routes>
        {/* Rutas Públicas */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        
        {/* Dashboard General */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Perfil de Usuario */}
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <PerfilPage />
            </ProtectedRoute>
          }
        />

        {/* --- RUTAS DE GESTIÓN DE USUARIOS --- */}
        
        {/* 1. Ruta para SysAdmin (Ve todo) */}
        <Route
          path="/admin/usuarios"
          element={
            <ProtectedRoute>
              <RolesPage />
            </ProtectedRoute>
          }
        />

        {/* 2. Ruta para Manager (Ve solo Student/Manager) */}
        {/* Reutilizamos RolesPage porque ya tiene la lógica de filtro interna */}
        <Route
          path="/manager/usuarios"
          element={
            <ProtectedRoute>
              <RolesPage />
            </ProtectedRoute>
          }
        />
        
        {/* Otras Rutas Protegidas */}
        <Route
          path="/completar-perfil"
          element={
            <ProtectedRoute>
              <CompletarPerfilPage />
            </ProtectedRoute>
          }
        />
        
        <Route path="/disciplinas" element={<DisciplinasPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;