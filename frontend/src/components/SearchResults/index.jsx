import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const history = useHistory();

  const results = location.state.results;

  const redirect = id => {
    history.push(`/games/${id}`);
  };

  console.log(results);

  return (
    <div className='searchResults'>
      {results.length
        ? results.map((result, i) => (
          <div className='resultCard' key={result.id} onClick={() => redirect(result.id)}>
            <div className='photo'>
              <img src={result.image} alt={result.title} />
            </div>
            <div className='details'>
              <p className='title'>
                {i + 1}
                {'. '}
                {result.title}
              </p>
              <p className='rating'>
                {[...Array(5)].map((star, j) => (
                  <FontAwesomeIcon
                    key={j}
                    className={j < result.rating ? `star starNum${result.rating}` : 'star'}
                    icon='fa-solid fa-star'
                  />
                ))}
                <span>{result.totalOfReviews}</span>
              </p>
              <p>{result.description}</p>
            </div>
          </div>
        ))
        : <div>No games found.</div>}
    </div>
  );
};

export default SearchResults;
