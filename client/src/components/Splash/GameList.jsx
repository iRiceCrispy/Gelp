import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import noImage from '../../assets/no-image.png';
import './GameList.scss';

const GameList = () => {
  const games = useSelector(state => state.games);
  const gameList = Object.values(games).sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className='gameList'>
      {gameList.map(game => (
        <NavLink className='gameCard' key={game.id} to={`/games/${game.id}`}>
          <img className={game.image ? 'image' : 'noImage'} src={game.image || noImage} alt={game.title} />
          <p className='title'>{game.title}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default GameList;
