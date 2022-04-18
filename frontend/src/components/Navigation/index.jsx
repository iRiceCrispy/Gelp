import React, { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar';
import ProfileButton from './ProfileButton';
import './Navigation.scss';

const Navigation = () => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav>
      <div className='navBar'>
        <div className='home'>
          <Link className='logo' to='/'>
            <p>Gelp</p>
            <img src='/favicon.ico' alt='' />
          </Link>
        </div>
        <div className='searchbar'>
          <SearchBar />
        </div>
        <div className='options'>
          <Link className='navText' to='/games/add'>
            Add Game
          </Link>
        </div>
        <div className='userAuth'>
          {sessionUser ? (
            <ProfileButton />
          ) : (
            <ul>
              <li>
                <Link className='navText login' to='/login'>
                  Log In
                </Link>
              </li>
              <li>
                <Link className='navText logout btn btnRed' to='/signup'>
                  Sign Up
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
