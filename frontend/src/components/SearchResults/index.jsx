import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();

  return (
    <div>
      {location.search}
    </div>
  );
};

export default SearchResults;
