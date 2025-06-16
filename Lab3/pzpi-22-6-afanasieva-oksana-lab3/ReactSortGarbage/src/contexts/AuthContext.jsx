import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin, register as apiRegister, getUserById } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadUser = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (token && userId) {
      try {
        const userData = await getUserById(userId);
        setUser({
          ...userData,
          roleId: Number(userData.roleId)
        });
      } catch (error) {
        console.error('Failed to fetch user', error);
        logout();
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const { token, userId } = await apiLogin(email, password);
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      
      const userData = await getUserById(userId);
      const updatedUser = {
        ...userData,
        roleId: Number(userData.role)
      };
      setUser(updatedUser);
      
      return { success: true, user: updatedUser };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Login failed' 
      };
    }
  };

  const register = async (userData) => {
    try {
      await apiRegister(userData);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setUser(null);
    navigate('/');
  };

  const getRoleId = (role) => {
    return role;
  };

  return (
    <AuthContext.Provider value={{ 
      user,
      loading,
      login,
      register,
      logout,
      currentUser: user,
      loadUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);