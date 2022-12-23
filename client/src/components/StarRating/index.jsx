import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './StarRating.scss';

const StarRating = ({ rating, setRating, type }) => {
  const [hover, setHover] = useState(rating);

  const description = {
    0: 'Select your rating',
    1: 'Not Good',
    2: 'Could\'ve been better',
    3: 'OK',
    4: 'Good',
    5: 'Great',
  };

  if (type === 'rate') {
    return (
      <div className='starRating rate'>
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
        <p className='description'>{description[hover]}</p>
      </div>
    );
  }

  if (!type) {
    return (
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
  }
};
export default StarRating;
