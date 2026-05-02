import { Link, useNavigate } from 'react-router-dom';
import './Authentication.scss';
import API from '../../api/axios';
import { useState } from 'react';
import { ErrorMessage } from '../../components/ErrorMessage';
import { AuthenticationProps } from '../../../utils/types';
import isEmail from 'validator/es/lib/isEmail';

type AuthenticationRes = {
  data: {
    message: string; 
    isRegistered: boolean;
    token?: string;
  }
}

export default function Authentication({
  errorMessage,
  handleErrorMessage,
  isErrorMessage,
  layout
}: AuthenticationProps) {
  const [ username, setUsername ] = useState<string>('');
  const [ password, setPassword ] = useState<string>('');
  const [ email, setEmail ] = useState<string>('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      if (!username || !password || !email) return handleErrorMessage('All fields are required.');

      if (!isEmail(email)) return handleErrorMessage('Not a valid email address.');

      const res: AuthenticationRes = await API.post('/auth/register', {
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        password
      });
      
      if (res.data.isRegistered) {
        navigate('/home');
        localStorage.setItem('isUser', JSON.stringify(true));
      } else {
        handleErrorMessage(res.data.message);
      }
      
    } catch (error) {
      console.error(error);
    }
  }

  const handleLogin = async () => {
    try {
      if (!username || !password) return handleErrorMessage('Both fields are required.');

      const res: AuthenticationRes = await API.post('/auth/login', {
        username,
        password
      });

      res.data.isRegistered && navigate('/home');
    } catch (error: any) {
      handleErrorMessage(error.response?.data?.message);
    }
  }

  return (
    <main className="register-page">

      {
        isErrorMessage &&
        <ErrorMessage 
          errorMessage={errorMessage}
        />
      }

      <h1>
        {
          layout === 'register'
            ? 'Welcome to MoorTube!'
            : 'Welcome back!'
        }
      </h1>
      <h2>
        {
          layout === 'register'
            ? 'Your new destination for watching YouTube videos with more deliberation.'
            : 'Log in to continue enjoying MoorTube.'
        }
      </h2>
      <form className="register-form" onSubmit={e => {
        e.preventDefault();
        layout === 'register' ? handleRegister() : handleLogin();
        
      }}>
        <fieldset>
          <legend>Register a new account</legend>

          <div>
            <label htmlFor="username">Username:</label>
            <input value={username} onChange={e => setUsername(e.currentTarget.value)} type="text" name="username" id="username" placeholder="Enter a unique MoorTube username" />
          </div>

          {
            layout === 'register' &&
            <div>
              <label htmlFor="email">Email:</label>
              <input value={email} onChange={e => setEmail(e.currentTarget.value)} type="email" name="email" id="email" placeholder="Enter your email" />
            </div>
          }

          <div>
            <label htmlFor="password">Password:</label>
            <input value={password} onChange={e => setPassword(e.currentTarget.value)} type="password" name="password" id="password" placeholder="Enter a strong MoorTube password" />
          </div>

          <div>
            <button type="submit" className="register-btn">Become a MoorTuber</button>
            <span>Or</span>
            <Link to={layout === 'register' ? "/auth/login" : "/auth/register"} className="login-navigator-btn">
              {
                layout === 'register' ? 'Already have an account?' : 'Become a MoorTuber'
              }
            </Link>
          </div>
        </fieldset>

      </form>
      
    </main>
  );
}