import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './GameList.css';

const GameList = () => {
  const games = useSelector(state => state.games);
  const gameList = Object.values(games).sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className='gameList'>
      {gameList.map(game => (
        <NavLink className='gameContainer' key={game.id} to={`/games/${game.id}`}>
          <div
            className='gameImage'
            style={{
              backgroundImage: `url(${game.image || null})`,
            }}
          />
          <p className='gameTitle'>{game.title}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default GameList;
