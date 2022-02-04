import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const DropDownMenu = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  return (
    <div className='profileMenu'>
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

    document.querySelector('.profileMenu').addEventListener('click', e => {
      e.stopPropagation();
    });

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  return (
    <>
      <button onClick={() => !showMenu && setShowMenu(true)}>
        <i className='fas fa-user-circle'></i>
      </button>
      {showMenu && <DropDownMenu />}
    </>
  );
};

export default ProfileButton;
