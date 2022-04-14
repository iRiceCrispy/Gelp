import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SearchBar = () => {
  const history = useHistory();
  const [input, setInput] = useState('');
  const games = useSelector(state => state.games);

  const handleSubmit = e => {
    e.preventDefault();

    history.push({
      pathname: '/search',
      search: `?q=${input}`,
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
