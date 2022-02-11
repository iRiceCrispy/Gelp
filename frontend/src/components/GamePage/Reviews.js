import { useSelector } from 'react-redux';

const Reviews = ({ game }) => {
  const reviewsList = useSelector(state => state.reviews);
  const reviews = Object.values(reviewsList).filter(review => review.gameId === game.id);

  return (
    <div className='gameReviews'>
      <h2>Reviews</h2>
      {reviews.map(review => (
        <div key={review.id} className='review'>
          <span>Rating: {review.rating}</span>
          <p>{review.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
