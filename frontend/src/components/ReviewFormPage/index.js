import { useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, editReview } from '../../store/games';

const ReviewFormPage = ({ edit }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const gameId = parseInt(useParams().gameId);
  const reviewId = parseInt(useParams().reviewId);
  const currentReview = useSelector(state => state.games.current.Reviews[reviewId]);
  const [body, setBody] = useState(edit ? currentReview.body : '');
  const [rating, setRating] = useState(edit ? currentReview.rating : 0);

  if (!sessionUser) return <Redirect to='/login' />;

  const handleSubmit = async e => {
    e.preventDefault();

    if (!edit) {
      const review = {
        userId: sessionUser.id,
        gameId,
        body,
        rating,
      };

      await dispatch(addReview(review));
    } else {
      const review = { ...currentReview, body, rating };

      await dispatch(editReview(review));
    }
    return history.push('..');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Body
        <textarea value={body} onChange={e => setBody(e.target.value)} required />
      </label>
      <label>
        Rating
        <input type='number' value={rating} onChange={e => setRating(e.target.value)} />
      </label>
      <button type='submit'>{edit ? 'Edit Review' : 'Add Review'}</button>
    </form>
  );
};

export default ReviewFormPage;
