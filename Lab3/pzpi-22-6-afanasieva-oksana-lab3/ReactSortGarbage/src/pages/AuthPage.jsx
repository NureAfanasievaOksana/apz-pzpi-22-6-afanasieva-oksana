import { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-page">
      {isLogin ? (
        <>
          <LoginForm />
          <p>
            Don't have an account?{' '}
            <button onClick={() => setIsLogin(false)}>Register</button>
          </p>
        </>
      ) : (
        <>
          <RegisterForm />
          <p>
            Already have an account?{' '}
            <button onClick={() => setIsLogin(true)}>Login</button>
          </p>
        </>
      )}
    </div>
  );
};

export default AuthPage;