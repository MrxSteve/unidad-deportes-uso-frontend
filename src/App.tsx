import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Auth Pages
import LoginPage from './auth/pages/LoginPage';
import AuthCallback from './auth/pages/AuthCallback';
import DashboardHome from './auth/pages/DashboardHome';
import CompletarPerfilPage from './auth/pages/CompletarPerfilPage';
import PerfilPage from './auth/pages/PerfilPage';

// Home & Features
import HomePage from './Home/pages/HomePage';
import DisciplinasPage from './features/disciplinas/pages/DisciplinasPage';
import ReportesPage from './admin/pages/ReportePage';

// Admin & Config
import RolesPage from './admin/pages/RolesPage';
import ConfigDashboard from './admin/components/ConfigDashboard';

// Components
import ProtectedRoute from './auth/components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        theme="light" 
      />
      
      <Routes>
        {/* --- RUTAS PÚBLICAS --- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        
        {/* --- RUTAS PROTEGIDAS (DASHBOARD) --- */}
        <Route 
          path="/dashboard" 
          element={<ProtectedRoute><DashboardHome /></ProtectedRoute>} 
        />
        
        <Route 
          path="/perfil" 
          element={<ProtectedRoute><PerfilPage /></ProtectedRoute>} 
        />
        
        <Route 
          path="/completar-perfil" 
          element={<ProtectedRoute><CompletarPerfilPage /></ProtectedRoute>} 
        />
        
        <Route 
          path="/disciplinas" 
          element={<ProtectedRoute><DisciplinasPage /></ProtectedRoute>} 
        />

        {/* --- SECCIÓN DE REPORTES Y CONFIGURACIÓN --- */}
        <Route 
          path="/reportes" 
          element={<ProtectedRoute><ReportesPage /></ProtectedRoute>} 
        />

        <Route 
          path="/configuracion" 
          element={<ProtectedRoute><ConfigDashboard /></ProtectedRoute>} 
        />

        <Route 
          path="/configuracion/usuarios" 
          element={<ProtectedRoute><RolesPage /></ProtectedRoute>} 
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;