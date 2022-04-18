import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../../store/session';
import './forms.scss';

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
      <main>
        <div className='input username'>
          <input
            type='text'
            value={username}
            placeholder='Username'
            onChange={e => setUsername(e.target.value)}
          />
          <p className='error'>{errors.username}</p>
        </div>
        <div className='input email'>
          <input
            type='text'
            value={email}
            placeholder='Email'
            onChange={e => setEmail(e.target.value)}
          />
          <p className='error'>{errors.email}</p>
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
        <div className='input confirmPassword'>
          <input
            type='password'
            value={confirmPassword}
            placeholder='Confirm Password'
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <p className='error'>{errors.confirmPassword}</p>
        </div>
      </main>
      <footer>
        <button type='submit' className='btn btnRed'>
          Sign Up
        </button>
      </footer>
    </form>
  );
};

export default SignupForm;
