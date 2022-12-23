import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteReview } from '../../store/revews';
import StarRating from '../StarRating';
import './Review.scss';

const Reviews = ({ review, sessionUser }) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);
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
        <div className='ellipsis'>
          <button
            className='button btn transparent'
            type='button'
            onClick={() => setShowMenu(prev => !prev)}
          >
            <FontAwesomeIcon icon='fa-solid fa-ellipsis' />
          </button>
          {showMenu
          && (
            <div className='menu' onClick={e => e.stopPropagation()}>
              <Link
                className='menuItem btn transparent'
                to={`/reviews/${review.id}/edit`}
              >
                Edit Review
              </Link>
              <button
                className='menuItem btn transparent'
                type='button'
                onClick={() => deleteReviewEvent(review.id)}
              >
                Delete Review
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Reviews;
