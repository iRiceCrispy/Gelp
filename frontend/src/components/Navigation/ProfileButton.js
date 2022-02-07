import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import './ProfileButton.css';

const DropDownMenu = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='profileMenu' onClick={e => e.stopPropagation()}>
      <p>Username: {sessionUser.username}</p>
      <p>Email: {sessionUser.email}</p>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

const ProfileButton = () => {
  const [showMenu, setShowMenu] = useState(false);

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
      <button className='profileButton' onClick={() => !showMenu && setShowMenu(true)}>
        <i className='fas fa-user-circle fa-2x'></i>
      </button>
      {showMenu && <DropDownMenu />}
    </div>
  );
};

export default ProfileButton;
