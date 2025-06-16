import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { currentUser, logout } = useAuth();
  
  return (
    <header className="header">
      <div className="header-container">
        <nav className="nav">
          {currentUser?.roleId !== 4 && (
            <Link to="/containers">Containers</Link>
          )}
          
          {currentUser?.roleId === 2 && (
            <Link to="/admin/users">Users Admin</Link>
          )}
          
          {currentUser?.roleId === 3 && (
            <>
              <Link to="/admin/containers">Containers Admin</Link>
              <Link to="/admin/sensors">Sensors Admin</Link>
              <Link to="/admin/sensor-data">Sensor Data</Link>
              <Link to="/admin/notifications">Notifications</Link>
            </>
          )}
          
          {currentUser?.roleId === 4 && (
            <Link to="/admin/database">Database Admin</Link>
          )}
          
          {currentUser ? (
            <button onClick={logout}>Logout</button>
          ) : (
            <Link to="/">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;