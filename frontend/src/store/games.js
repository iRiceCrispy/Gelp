import { csrfFetch } from './csrf';

const LOAD = 'games/load';
const GET = 'games/get';
const ADD = 'games/add';
const EDIT = 'games/edit';
const REMOVE = 'games/remove';

const load = games => ({
  type: LOAD,
  games,
});

const get = game => ({
  type: GET,
  game,
});

const add = game => ({
  type: ADD,
  game,
});

const edit = game => ({
  type: EDIT,
  game,
});

const remove = id => ({
  type: REMOVE,
  id,
});

export const loadGames = () => async dispatch => {
  const res = await fetch('/api/games');

  const games = await res.json();

  dispatch(load(games));

  return res;
};

export const getGame = id => async dispatch => {
  const res = await fetch(`/api/games/${id}`);

  const game = await res.json();
  dispatch(get(game));

  return res;
};

export const addGame = data => async dispatch => {
  const res = await csrfFetch('/api/games', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  const game = await res.json();
  dispatch(add(game));

  return res;
};

export const editGame = data => async dispatch => {
  const res = await csrfFetch(`/api/games/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  const game = await res.json();
  dispatch(edit(game));

  return res;
};

export const removeGame = id => async dispatch => {
  const res = await csrfFetch(`/api/games/${id}`, {
    method: 'DELETE',
  });

  dispatch(remove(id));

  return res;
};

const initialState = {
  list: {},
  current: {},
};

const gamesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const games = {};
      action.games.forEach(game => {
        games[game.id] = game;
      });
      state.list = games;
      return { ...state };
    case GET:
      state.current = action.game;
      return { ...state };
    case ADD:
      state.list[action.game.id] = action.game;
      return { ...state };
    case EDIT:
      state.list[action.game.id] = action.game;
      return { ...state };
    case REMOVE:
      delete state.list[action.id];
      return { ...state };
    default:
      return state;
  }
};

export default gamesReducer;
