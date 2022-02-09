import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadGames } from '../../store/games';
import './GameList.css';

const GameList = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const games = useSelector(state => state.games.list);
  const gameList = Object.values(games);

  useEffect(() => {
    dispatch(loadGames()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    isLoaded && (
      <div className='gameList'>
        {gameList.map(game => (
          <NavLink key={game.id} to={`/games/${game.id}`}>
            <div
              className='gameContainer'
              style={{
                backgroundImage: `url(${game.image})`,
              }}
            ></div>
            <p className='gameTitle'>{game.title}</p>
          </NavLink>
        ))}
      </div>
    )
  );
};

export default GameList;
