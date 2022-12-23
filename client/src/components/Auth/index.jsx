import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginForm from '../Forms/LoginForm';
import SignupForm from '../Forms/SignupForm';
import gamer from '../../assets/gamer.png';
import './Auth.scss';

const Auth = ({ type }) => {
  const sessionUser = useSelector(state => state.session.user);

  if (sessionUser) return <Redirect to='/' />;

  return (
    <div className={`auth ${type}`}>
      <header>
        <Link className='logo' to='/'>
          <span>Gelp</span>
          <img src='/favicon.ico' alt='' />
        </Link>
      </header>
      <div className='content'>
        <div className='left'>
          <div className='formContainer'>
            <h2 className='formHeading'>
              {type === 'login' ? 'Log in to Gelp' : 'Sign up for Gelp'}
            </h2>
            {type === 'login' ? <LoginForm /> : <SignupForm />}
            <div className='redirect'>
              {type === 'login' ? (
                <div>
                  New to Gelp?
                  {' '}
                  <Link to='/signup'>Sign Up</Link>
                </div>
              ) : (
                <div>
                  Already on Gelp?
                  {' '}
                  <Link to='/login'>Log In</Link>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='right'>
          <div className='imageContainer'>
            <img src={gamer} alt='gamer' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
