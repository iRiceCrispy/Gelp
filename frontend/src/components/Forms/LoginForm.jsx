import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, demoLogin } from '../../store/session';
import './forms.scss';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({});

    return dispatch(login({ credential, password })).catch(async res => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <form className='loginForm' onSubmit={handleSubmit}>
      <main>
        <div className='loginError'>
          <p className='error'>{errors.login}</p>
        </div>
        <div className='input credential'>
          <input
            type='text'
            value={credential}
            placeholder='Username or Email'
            onChange={e => setCredential(e.target.value)}
          />
          <p className='error'>{errors.credential}</p>
        </div>
        <div className='input password'>
          <input
            type='password'
            value={password}
            placeholder='Password'
            onChange={e => setPassword(e.target.value)}
          />
          <p className='error'>{errors.password}</p>
        </div>
      </main>
      <footer>
        <button type='submit' className='btn btnRed'>
          Login
        </button>
        <fieldset className='orLine'>
          <legend align='center'>OR</legend>
        </fieldset>
        <button type='button' className='btn btnRed' onClick={() => dispatch(demoLogin())}>
          Login as Demo
        </button>
      </footer>
    </form>
  );
};

export default LoginForm;
