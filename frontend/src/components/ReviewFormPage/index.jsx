import React, { useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addReview, editReview } from '../../store/revews';
import './ReviewFormPage.scss';

const ReviewFormPage = ({ edit }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const gameId = parseInt(useParams().gameId);
  const reviewId = parseInt(useParams().reviewId);
  const currentGame = useSelector(state => state.games[gameId]);
  const currentReview = useSelector(state => state.reviews[reviewId]);
  const [body, setBody] = useState(edit ? currentReview?.body : '');
  const [rating, setRating] = useState(edit ? currentReview?.rating : 0);
  const [hover, setHover] = useState(rating);
  const [errors, setErrors] = useState({});

  if (!sessionUser) return <Redirect to='/login' />;
  if ((!edit && !currentGame) || (edit && !currentReview)) return <Redirect to='/404' />;

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
    <div className='formContainer'>
      <p className='formTitle'>
        {edit
          ? `Edit Reivew for ${currentGame?.title || currentReview.game.title}`
          : `Add Review for ${currentGame?.title || currentReview.game.title}`}
      </p>
      <form onSubmit={handleSubmit}>
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
    </div>
  );
};

export default ReviewFormPage;
