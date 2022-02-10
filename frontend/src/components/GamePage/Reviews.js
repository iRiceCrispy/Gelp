const Reviews = ({ game }) => {
  const reviews = Object.values(game.Reviews);
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
