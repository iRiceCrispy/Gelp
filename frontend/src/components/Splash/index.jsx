import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchBar from '../Navigation/SearchBar';
import ProfileButton from '../Navigation/Profile';
import GameList from './GameList';
import './Splash.scss';

const Splash = () => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div id='home'>
      <header>
        <nav id='splash'>
          <div className='options'>
            <Link
              className='navOption btn underline bold'
              to='/games/add'
            >
              Add Game
            </Link>
          </div>
          <div className='userAuth'>
            {sessionUser ? (
              <ProfileButton />
            ) : (
              <>
                <Link className='navOption login btn underline bold' to='/login'>
                  Log In
                </Link>
                <Link className='navOption signup btn border bold' to='/signup'>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
        <div className='content'>
          <a className='home' href='/'>
            <span>Gelp</span>
            <img src='/favicon.ico' alt='' />
          </a>
          <SearchBar />
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
