import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteReview } from '../../store/revews';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Reviews.css';

const Reviews = ({ game, reviews, sessionUser }) => {
  const dispatch = useDispatch();

  const deleteReviewEvent = id => {
    dispatch(deleteReview(id));
  };

  return (
    <div className='gameReviews'>
      <h2>Reviews:</h2>
      {reviews.length ? (
        reviews.map(review => (
          <div key={review.id} className='review'>
            <p className='reviewUser'>User: {review.user.username}</p>
            <div className='reviewRating'>
              {[...Array(5)].map((star, i) => {
                return (
                  <span
                    key={i}
                    className={i < review.rating ? `star starNum${review.rating}` : 'star'}
                  >
                    <FontAwesomeIcon icon="fa-solid fa-star" />
                  </span>
                );
              })}
            </div>
            <p className='reviewBody'>{review.body}</p>
            {sessionUser?.id === review.userId && (
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
        ))
      ) : (
        <p>No Reviews</p>
      )}
    </div>
  );
};

export default Reviews;
