import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignupForm from '../Forms/SignupForm';

const SignupFormPage = () => {
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) return <Redirect to='/' />;

  return (
    <div className='formContainer'>
      <p className='formTitle'>Sign Up</p>
      <SignupForm />
    </div>
  );
};

export default SignupFormPage;
