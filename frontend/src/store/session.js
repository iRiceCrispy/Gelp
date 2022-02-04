import { csrfFetch } from './csrf';

const LOGIN = 'session/login';
const LOGOUT = 'session/logout';

const loginUser = user => ({
  type: LOGIN,
  user,
});

const logoutUser = () => ({
  type: LOGOUT,
});

export const login = user => async dispatch => {
  const { credential, password } = user;

  const res = await csrfFetch('/api/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential, password }),
  });

  const data = await res.json();
  dispatch(loginUser(data.user));

  return res;
};

const sessionReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case LOGIN:
      return { user: action.user };
    case LOGOUT:
      return { user: null };
    default:
      return state;
  }
};

export default sessionReducer;
