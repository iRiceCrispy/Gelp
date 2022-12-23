import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addReview, editReview } from '../../store/revews';
import StarRating from '../StarRating';
import './forms.scss';

const ReviewForm = ({ sessionUser, currentGame, currentReview, edit }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [body, setBody] = useState(currentReview.body || '');
  const [rating, setRating] = useState(currentReview.rating || 0);
  const [errors, setErrors] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors({});

    if (!edit) {
      const review = {
        userId: sessionUser.id,
        gameId: currentGame.id,
        body,
        rating,
      };

      return dispatch(addReview(review))
        .then(() => history.push(`/games/${currentGame.id}`))
        .catch(async res => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    const review = { ...currentReview, body, rating };

    return dispatch(editReview(review))
      .then(() => history.push(`/games/${review.gameId}`))
      .catch(async res => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <form className='reviewForm' onSubmit={handleSubmit}>
      <main>
        <div className='input rating'>
          <StarRating rating={rating} setRating={setRating} type='rate' />
          <p className='error'>{errors.rating}</p>
        </div>
        <div className='input body'>
          <textarea
            value={body}
            placeholder={`${currentGame.title} is an awesome game!!!`}
            onChange={e => setBody(e.target.value)}
          />
          <p className='error'>{errors.body}</p>
        </div>
      </main>
      <footer>
        <button type='submit' className='btn'>
          {edit ? 'Update Review' : 'Post Review'}
        </button>
      </footer>
    </form>
  );
};

export default ReviewForm;
