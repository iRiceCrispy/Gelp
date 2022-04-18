import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, demoLogin } from '../../store/session';

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
      <div className='loginError'>
        <p className='error'>{errors.login}</p>
      </div>
      <label>
        Username/Email *
        <input
          type='text'
          value={credential}
          onChange={e => setCredential(e.target.value)}
        />
        <p className='error'>{errors.credential}</p>
      </label>
      <label>
        Password *
        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <p className='error'>{errors.password}</p>
      </label>
      <button type='submit' className='btn btnRed'>
        Login
      </button>
      <button type='button' className='btn' onClick={() => dispatch(demoLogin())}>
        Login as demo
      </button>
    </form>
  );
};

export default LoginForm;
