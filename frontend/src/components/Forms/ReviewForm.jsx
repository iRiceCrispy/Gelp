import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addReview, editReview } from '../../store/revews';

const ReviewForm = ({ sessionUser, gameId, currentReview, edit }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [body, setBody] = useState(currentReview.body || '');
  const [rating, setRating] = useState(currentReview.rating || 0);
  const [hover, setHover] = useState(rating);
  const [errors, setErrors] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();
    setErrors({});

    if (!edit) {
      const review = {
        userId: sessionUser.id,
        gameId,
        body,
        rating,
      };

      return dispatch(addReview(review))
        .then(() => history.push(`/games/${gameId}`))
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
      <div className='starRating'>
        {[...Array(5)].map((star, i) => (
          <span
            key={i}
            className={i < (hover || rating) ? `star starNum${hover}` : 'star'}
            onClick={() => setRating(i + 1)}
            onMouseEnter={() => setHover(i + 1)}
            onMouseLeave={() => setHover(rating)}
          >
            <FontAwesomeIcon icon='fa-solid fa-star' />
          </span>
        ))}
        <p className='error'>{errors.rating}</p>
      </div>
      <label>
        <textarea value={body} onChange={e => setBody(e.target.value)} />
        <p className='error'>{errors.body}</p>
      </label>
      <button type='submit' className='btn btnRed'>
        {edit ? 'Edit Review' : 'Add Review'}
      </button>
    </form>
  );
};

export default ReviewForm;
