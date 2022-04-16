import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SearchBar.css';

const SearchBar = () => {
  const history = useHistory();
  const [input, setInput] = useState('');
  const games = Object.values(useSelector(state => state.games));
  const reviews = Object.values(useSelector(state => state.reviews));

  const results = input
    ? games
      .filter(game => game.title.toLowerCase().includes(input.toLowerCase())
      || game.description.toLowerCase().includes(input.toLowerCase()))
      .map(game => {
        const revs = reviews.filter(review => review.gameId === game.id);
        const avgRating = revs.reduce((sum, review) => sum + review.rating, 0) / revs.length;
        game.rating = Math.floor(avgRating);
        game.totalOfReviews = revs.length;
        return game;
      })
    : [];

  const handleSubmit = e => {
    e.preventDefault();

    history.push({
      pathname: '/search',
      search: `?q=${input}`,
      state: { results },
    });

    setInput('');
  };

  return (
    <div className='searchbarContainer'>
      <form
        className='searchForm'
        onSubmit={handleSubmit}
      >
        <div className='searchContainer'>
          <div className='inputContainer'>
            <input type='text' value={input} onChange={e => setInput(e.target.value)} />
          </div>
          {input && results.length > 0 && (
            <div className='resultsContainer'>
              {results.map(result => (
                <div
                  className='result'
                  key={result.id}
                  onClick={() => history.push(`/games/${result.id}`)}
                >
                  {result.title}
                </div>
              ))}
            </div>
          )}
        </div>
        <button className='searchButton' type='submit'>
          <FontAwesomeIcon icon='fa-solid fa-magnifying-glass' />
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
