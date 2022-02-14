import { useState } from 'react';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, editReview } from '../../store/revews';
import './ReviewFormPage.css';

const ReviewFormPage = ({ edit }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user);
  const gameId = parseInt(useParams().gameId);
  const reviewId = parseInt(useParams().reviewId);
  const currentReview = useSelector(state => state.reviews[reviewId]);
  const currentGame = useSelector(state => state.games[gameId]);
  const [body, setBody] = useState(edit ? currentReview.body : '');
  const [rating, setRating] = useState(edit ? currentReview.rating : 0);
  const [hover, setHover] = useState(rating);
  const [errors, setErrors] = useState([]);

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

      return dispatch(addReview(review))
        .then(() => history.push(`/games/${gameId}`))
        .catch(async res => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    } else {
      const review = { ...currentReview, body, rating };

      return dispatch(editReview(review))
        .then(() => history.push(`/games/${review.gameId}`))
        .catch(async res => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
  };

  return (
    <div className='formContainer'>
      <p className='formTitle'>
        {edit
          ? `Edit Reivew for ${currentGame?.title || currentReview.game.title}`
          : `Add Review for ${currentGame?.title || currentReview.game.title}`}
      </p>
      <form onSubmit={handleSubmit}>
        <ul className='errors'>
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
        <div className='starRating'>
          {[...Array(5)].map((star, i) => {
            return (
              <span
                key={i}
                className={i < (hover || rating) ? `star starNum${hover}` : 'star'}
                onClick={() => setRating(i + 1)}
                onMouseEnter={() => setHover(i + 1)}
                onMouseLeave={() => setHover(rating)}
              >
                <i className='fas fa-star'></i>
              </span>
            );
          })}
        </div>
        <label>
          <textarea value={body} onChange={e => setBody(e.target.value)} required />
        </label>
        <button type='submit' className='btn btnRed'>
          {edit ? 'Edit Review' : 'Add Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewFormPage;
