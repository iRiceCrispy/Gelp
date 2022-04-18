import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import StarRating from '../StarRating';
import { deleteReview } from '../../store/revews';
import './Review.scss';

const Reviews = ({ review, sessionUser }) => {
  const dispatch = useDispatch();

  const deleteReviewEvent = id => {
    dispatch(deleteReview(id));
  };

  return (
    <div key={review.id} className='review'>
      <p className='user'>
        User:
        {' '}
        {review.user.username}
      </p>
      <div className='rating'>
        <StarRating rating={review.rating} />
      </div>
      <p className='body'>{review.body}</p>
      {sessionUser?.id === review.userId && (
        <div className='buttons'>
          <Link className='btn' to={`/reviews/${review.id}/edit`}>
            Edit
          </Link>
          <button className='btn' type='button' onClick={() => deleteReviewEvent(review.id)}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Reviews;
