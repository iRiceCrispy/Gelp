import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from '../../store/session';
import './Profile.scss';

const ProfileButton = () => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  return (
    <div className='profile'>
      <button
        className='profileButton'
        type='button'
        onClick={() => !showMenu && setShowMenu(true)}
      >
        <FontAwesomeIcon icon='fa-solid fa-circle-user' />
      </button>
      {showMenu && (
        <div className='profileMenu' onClick={e => e.stopPropagation()}>
          <div className='menuItem'>
            <span className='icon'>
              <FontAwesomeIcon icon='fa-regular fa-circle-user' />
            </span>
            <span className='text'>
              {sessionUser.username}
            </span>
          </div>
          <div className='logout'>
            <button
              className='menuItem btn transparent'
              type='button'
              onClick={() => dispatch(logout())}
            >
              <span className='icon'>
                <FontAwesomeIcon icon='fa-solid fa-arrow-right-from-bracket' />
              </span>
              <span className='text'>
                Logout
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
