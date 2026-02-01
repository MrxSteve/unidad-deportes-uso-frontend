import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Auth Pages
import LoginPage from './auth/pages/LoginPage';
import AuthCallback from './auth/pages/AuthCallback';
import DashboardPage from './auth/pages/DashboardPage';
import CompletarPerfilPage from './auth/pages/CompletarPerfilPage';

// Home Page
import HomePage from './Home/pages/HomePage';

// Disciplinas
import DisciplinasPage from './features/disciplinas/pages/DisciplinasPage';

// Components
import ProtectedRoute from './auth/components/ProtectedRoute';

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
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
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
