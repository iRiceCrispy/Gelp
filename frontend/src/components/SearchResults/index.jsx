import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();

  const results = location.state.results;

  return (
    <div>
      {results.length
        ? results.map(result => (
          <div>{result.title}</div>
        ))
        : <div>No games found.</div>}
    </div>
  );
};

export default SearchResults;
