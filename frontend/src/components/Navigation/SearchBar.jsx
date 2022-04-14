import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SearchBar = () => {
  const history = useHistory();
  const [input, setInput] = useState('');
  const games = Object.values(useSelector(state => state.games));

  const results = games
    .filter(game => game.title.toLowerCase().includes(input.toLowerCase())
      || game.description.toLowerCase().includes(input.toLowerCase()));

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
    <div>
      <form
        className='searchForm'
        onSubmit={handleSubmit}
      >
        <input type='search' value={input} onChange={e => setInput(e.target.value)} />
      </form>
    </div>
  );
};

export default SearchBar;
