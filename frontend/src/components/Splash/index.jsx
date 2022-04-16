import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchBar from '../Navigation/SearchBar';
import ProfileButton from '../Navigation/ProfileButton';
import GameList from './GameList';
import './Splash.css';

const Splash = () => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='mainContainer'>
      <div
        className='headContainer'
        style={{
          backgroundImage: 'url(\'https://thenerdstash.com/wp-content/uploads/2015/10/Project-Zomboid.png\')',
        }}
      >
        <div className='innerHeadContainer'>
          <div className='userAuth'>
            {sessionUser ? (
              <ProfileButton />
            ) : (
              <>
                <Link className='navText login' to='/login'>
                  Log In
                </Link>
                <Link className='navText logout btn btnRed' to='/signup'>
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
      </div>
      <div className='bodyContainer'>
        <p>Find the Best Games Online</p>
        <GameList />
      </div>
    </div>
  );
};
export default Splash;
