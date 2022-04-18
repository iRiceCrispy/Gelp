import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import noImage from '../../assets/no-image.png';
import StarRating from '../StarRating';
import './SearchResults.scss';

const SearchResults = () => {
  const location = useLocation();
  const history = useHistory();

  const results = location.state.results;

  const redirect = id => {
    history.push(`/games/${id}`);
  };

  return (
    <div className='searchResults'>
      {results.length
        ? results.map((result, i) => (
          <div className='resultCard' key={result.id} onClick={() => redirect(result.id)}>
            <div className='photo'>
              <img src={result.image || noImage} alt={result.title} />
            </div>
            <div className='details'>
              <p className='title'>
                {i + 1}
                {'. '}
                {result.title}
              </p>
              <div className='rating'>
                <StarRating rating={result.rating} />
                <span>{result.totalOfReviews}</span>
              </div>
              <p>{result.description}</p>
            </div>
          </div>
        ))
        : <div>No games found.</div>}
    </div>
  );
};

export default SearchResults;
