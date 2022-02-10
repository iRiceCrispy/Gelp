import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

const Navigation = () => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className='nav'>
      <div className='navBar'>
        <div className='home'>
          <Link className='navText' to='/'>
            Home
          </Link>
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
                <Link className='navText' className='login' to='/login'>
                  Login
                </Link>
              </li>
              <li>
                <Link className='navText' className='logout' to='/signup'>
                  Signup
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
