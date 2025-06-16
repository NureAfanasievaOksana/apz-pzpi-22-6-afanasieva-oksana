import { useAuth } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return null;

  if (!user) return <Navigate to="/" state={{ from: location }} replace />;

  if (requiredRole && user.roleId !== requiredRole) {
    return <Navigate to="/containers" replace />;
  }

  return children;
};

export default PrivateRoute;