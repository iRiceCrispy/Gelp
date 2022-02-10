import { csrfFetch } from './csrf';

const LOAD = 'games/load';
const GET = 'games/get';
const ADD = 'games/add';
const EDIT = 'games/edit';
const REMOVE = 'games/remove';
const ADD_REVIEW = 'games/add_review';
const EDIT_REVIEW = 'games/edit_review';
const REMOVE_REVIEW = 'games/remove_review';

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

const addRev = (gameId, review) => ({
  type: ADD_REVIEW,
  gameId,
  review,
});

const editRev = (gameId, review) => ({
  type: EDIT_REVIEW,
  gameId,
  review,
});

const removeRev = (gameId, reviewId) => ({
  type: REMOVE_REVIEW,
  gameId,
  reviewId,
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

export const addReview = data => async dispatch => {
  const { gameId } = data;

  const res = await csrfFetch(`/api/games/${gameId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  const review = await res.json();
  dispatch(addRev(gameId, review));

  return res;
};

export const editReview = data => async dispatch => {
  const { gameId } = data;

  const res = await csrfFetch(`/reviews/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  const review = await res.json();
  dispatch(editRev(gameId, review));

  return res;
};

export const deleteReview = data => async dispatch => {
  const { gameId, reviewId } = data;

  const res = await csrfFetch(`/reviews/${reviewId}`, {
    method: 'DELETE',
  });

  dispatch(removeRev(gameId, reviewId));

  return res;
};

const initialState = {
  list: {},
  current: {},
};

const gamesReducer = (state = initialState, action) => {
  let game;
  switch (action.type) {
    case LOAD:
      const games = {};
      action.games.forEach(game => {
        games[game.id] = game;
      });
      state.list = games;
      return { ...state };
    case GET:
      state.current = { ...action.game };
      state.current.Reviews = {};
      action.game.Reviews.forEach(review => {
        state.current.Reviews[review.id] = review;
      });
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
    case ADD_REVIEW:
      game = state.current;
      game.Reviews[action.review.id] = action.review;
      state.current = game;
      return { ...state };
    case EDIT_REVIEW:
      game = state.current;
      game.Reviews[action.review.id] = action.review;
      state.current = game;
      return { ...state };
    case REMOVE_REVIEW:
      delete state.current.Reviews[action.review.id];
      return { ...state };
    default:
      return state;
  }
};

export default gamesReducer;
