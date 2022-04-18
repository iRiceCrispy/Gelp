import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './StarRating.scss';

const StarRating = ({ rating }) => (
  <div className='starRating'>
    {[...Array(5)].map((star, i) => (
      <span
        key={i}
        className={i < rating ? `star starNum${rating}` : 'star'}
      >
        <FontAwesomeIcon icon='fa-solid fa-star' />
      </span>
    ))}
  </div>
);

export default StarRating;
