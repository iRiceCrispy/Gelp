import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadGames } from '../../store/games';
import './GameList.css';

const GameList = () => {
  const dispatch = useDispatch();
  const games = useSelector(state => state.games.list);
  const gameList = Object.values(games);

  useEffect(() => {
    dispatch(loadGames());
  }, [dispatch]);

  return (
    <div className='gameList'>
      {gameList.map(game => (
        <NavLink key={game.id} to={`/games/${game.id}`}>
          <div className='gameContainer' key={game.id}>
            <p className='gameTitle'>{game.title}</p>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default GameList;
