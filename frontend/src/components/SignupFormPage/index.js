import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to='/' />;

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({});

    return dispatch(sessionActions.signup({ email, username, password, confirmPassword }))
      .catch(async res => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className='formContainer'>
      <p className='formTitle'>Sign Up</p>
      <form onSubmit={handleSubmit}>
        <label>
          Username *
          <input
            type='text'
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <p className='error'>{errors.username}</p>
        </label>
        <label>
          Email *
          <input
            type='text'
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <p className='error'>{errors.email}</p>
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
        <label>
          Confirm Password *
          <input
            type='password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <p className='error'>{errors.confirmPassword}</p>
        </label>
        <button type='submit' className='btn btnRed'>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormPage;
