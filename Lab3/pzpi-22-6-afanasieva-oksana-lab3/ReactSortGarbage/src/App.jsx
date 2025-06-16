import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';
import AuthPage from './pages/AuthPage';
import ContainersPage from './pages/ContainersPage';
import UsersAdminPage from './pages/UsersAdminPage';
import ContainersAdminPage from './pages/ContainersAdminPage';
import DatabaseAdminPage from './pages/DatabaseAdminPage';
import NotificationsPage from './pages/NotificationsPage';
import SensorsAdminPage from './pages/SensorsAdminPage';
import SensorDataPage from './pages/SensorDataPage';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<AuthPage />} />
              <Route path="/containers" element={
                <PrivateRoute>
                  <ContainersPage />
                </PrivateRoute>
              } />
              <Route path="/admin/users" element={
                <PrivateRoute requiredRole={2}>
                  <UsersAdminPage />
                </PrivateRoute>
              } />
              <Route path="/admin/containers" element={
                <PrivateRoute requiredRole={3}>
                  <ContainersAdminPage />
                </PrivateRoute>
              } />
              <Route path="/admin/database" element={
                <PrivateRoute requiredRole={4}>
                  <DatabaseAdminPage />
                </PrivateRoute>
              } />
              <Route path="/admin/notifications" element={
                <PrivateRoute requiredRole={3}>
                  <NotificationsPage />
                </PrivateRoute>
              } />
              <Route path="/admin/sensor-data" element={
                <PrivateRoute requiredRole={3}>
                  <SensorDataPage />
                </PrivateRoute>
              } />
              <Route path="/admin/sensors" element={
                <PrivateRoute requiredRole={3}>
                  <SensorsAdminPage />
                </PrivateRoute>
              } />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;