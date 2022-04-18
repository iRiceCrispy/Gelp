import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginForm from '../Forms/LoginForm';

const LoginFormPage = () => {
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) return <Redirect to='/' />;

  return (
    <div className='loginPage'>
      <p className='formTitle'>Log In</p>
      <LoginForm />
    </div>
  );
};

export default LoginFormPage;
