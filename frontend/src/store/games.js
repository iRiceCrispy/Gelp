import { csrfFetch } from './csrf';

const LOAD = 'games/load';
const ADD = 'games/add';
const EDIT = 'games/edit';
const REMOVE = 'games/remove';

const load = games => ({
  type: LOAD,
  games,
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

export const deleteGame = id => async dispatch => {
  const res = await csrfFetch(`/api/games/${id}`, {
    method: 'DELETE',
  });

  dispatch(remove(id));

  return res;
};

const gamesReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      const games = {};
      action.games.forEach(game => {
        games[game.id] = game;
      });
      state = games;
      return { ...state };
    case ADD:
      state[action.game.id] = action.game;
      return { ...state };
    case EDIT:
      state[action.game.id] = action.game;
      return { ...state };
    case REMOVE:
      delete state[action.id];
      return { ...state };
    default:
      return state;
  }
};

export default gamesReducer;
