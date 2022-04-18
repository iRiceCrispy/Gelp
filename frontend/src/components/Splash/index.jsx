import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchBar from '../Navigation/SearchBar';
import ProfileButton from '../Navigation/ProfileButton';
import GameList from './GameList';
import './Splash.scss';

const Splash = () => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div id='home'>
      <header>
        <div className='content'>
          <div className='userAuth'>
            {sessionUser ? (
              <ProfileButton />
            ) : (
              <>
                <Link className='login' to='/login'>
                  Log In
                </Link>
                <Link className='logout btn btnRed' to='/signup'>
                  Sign Up
                </Link>
              </>
            )}
          </div>
          <a className='home' href='/'>
            <span>Gelp</span>
            <img src='/favicon.ico' alt='' />
          </a>
          <div className='searchbar'>
            <SearchBar />
          </div>
        </div>
      </header>
      <main>
        <h2>Find the Best Games Online</h2>
        <GameList />
      </main>
    </div>
  );
};
export default Splash;
