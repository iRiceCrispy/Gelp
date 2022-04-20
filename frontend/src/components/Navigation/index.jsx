import React, { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar';
import ProfileButton from './ProfileButton';
import './Navigation.scss';

const Navigation = () => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav id='main'>
      <div className='navBar'>
        <div className='home'>
          <Link className='logo' to='/'>
            <span>Gelp</span>
            <img src='/favicon.ico' alt='' />
          </Link>
        </div>
        <SearchBar />
        <div className='options'>
          <Link className='navOption btn transparent' to='/games/add'>
            Add Game
          </Link>
        </div>
        <div className='userAuth'>
          {sessionUser ? (
            <ProfileButton />
          ) : (
            <>
              <Link className='login btn border' to='/login'>
                Log In
              </Link>

              <Link className='signup btn' to='/signup'>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
