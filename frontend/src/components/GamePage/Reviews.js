import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReview } from '../../store/revews';
import './Reviews.css';

const Reviews = ({ game, sessionUser }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const reviewsList = useSelector(state => state.reviews);
  const reviews = Object.values(reviewsList).filter(review => review.gameId === game.id);

  const deleteReviewEvent = id => {
    dispatch(deleteReview(id)).then(() => history.push(`/games/${game.id}`));
  };

  return (
    <div className='gameReviews'>
      <h2>Reviews</h2>
      {reviews.map(review => (
        <div key={review.id} className='review'>
          <span className='reviewRating'>Rating: {review.rating}</span>
          <p className='reviewBody'>{review.body}</p>
          {sessionUser.id === review.userId && (
            <div className='reviewButtonContainer'>
              <Link className='btn' to={`/reviews/${review.id}/edit`}>
                Edit
              </Link>
              <button className='btn' type='button' onClick={() => deleteReviewEvent(review.id)}>
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Reviews;
