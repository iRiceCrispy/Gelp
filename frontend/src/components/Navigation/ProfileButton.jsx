import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { logout } from '../../store/session';
import './ProfileButton.scss';

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
        <FontAwesomeIcon className='icon' icon='fa-solid fa-circle-user' />
      </button>
      {showMenu && (
        <div className='profileMenu' onClick={e => e.stopPropagation()}>
          <p>
            Username:
            {' '}
            {sessionUser.username}
          </p>
          <p>
            Email:
            {' '}
            {sessionUser.email}
          </p>
          <button className='btn' type='button' onClick={() => dispatch(logout())}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
