import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);
  
  const result = await login(email, password);
  setLoading(false);
  
  if (result.success) {
    if (result.user && result.user.roleId) {
      switch(result.user.roleId) {
        case 2: navigate('/admin/users'); break;
        case 3: navigate('/admin/containers'); break;
        case 4: navigate('/admin/database'); break;
        default: navigate('/containers');
      }
    } else {
      navigate('/');
    }
  } else {
    setError(result.error || 'Login failed. Please try again.');
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {error && <div className="error">{error}</div>}
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;