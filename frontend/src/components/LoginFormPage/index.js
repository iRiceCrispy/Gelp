import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, demoLogin } from '../../store/session';

const LoginFormPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to='/' />;

  const handleSubmit = e => {
    e.preventDefault();
    setErrors([]);
    return dispatch(login({ credential, password })).catch(async res => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <div className='formContainer'>
      <p className='formTitle'>Log In</p>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Username/Email
          <input
            type='text'
            value={credential}
            onChange={e => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <button type='submit' className='btn btnRed'>
          Login
        </button>
        <button type='button' className='btn' onClick={() => dispatch(demoLogin())}>
          Login as demo
        </button>
      </form>
    </div>
  );
};

export default LoginFormPage;
