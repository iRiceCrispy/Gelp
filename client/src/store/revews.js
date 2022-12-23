import { csrfFetch } from './csrf';

const LOAD = 'reviews/load';
const ADD = 'reviews/add';
const EDIT = 'reviews/edit';
const REMOVE = 'reviews/remove';

const load = reviews => ({
  type: LOAD,
  reviews,
});

const add = review => ({
  type: ADD,
  review,
});

const edit = review => ({
  type: EDIT,
  review,
});

const remove = id => ({
  type: REMOVE,
  id,
});

export const loadReviews = () => async dispatch => {
  const res = await fetch('/api/reviews');

  const reviews = await res.json();
  dispatch(load(reviews));

  return res;
};

export const addReview = data => async dispatch => {
  const res = await csrfFetch(`/api/games/${data.gameId}/reviews`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  const review = await res.json();
  dispatch(add(review));

  return res;
};

export const editReview = data => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  const review = await res.json();
  dispatch(edit(review));

  return res;
};

export const deleteReview = id => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${id}`, {
    method: 'DELETE',
  });

  dispatch(remove(id));

  return res;
};

const reviewsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD:
      action.reviews.forEach(review => {
        state[review.id] = review;
      });
      return state;
    case ADD:
      state[action.review.id] = action.review;
      return { ...state };
    case EDIT:
      state[action.review.id] = { ...state[action.review.id], ...action.review };
      return { ...state };
    case REMOVE:
      delete state[action.id];
      return { ...state };
    default:
      return state;
  }
};

export default reviewsReducer;
