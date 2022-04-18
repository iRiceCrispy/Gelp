import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../../store/session';

const SignupForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = e => {
    e.preventDefault();
    setErrors({});

    dispatch(signup({ email, username, password, confirmPassword }))
      .catch(async res => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <form className='signupForm' onSubmit={handleSubmit}>
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
  );
};

export default SignupForm;
