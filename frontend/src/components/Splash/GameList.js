import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './GameList.css';

const GameList = () => {
  const games = useSelector(state => state.games);
  const gameList = Object.values(games);

  return (
    <div className='gameList'>
      {gameList.map(game => (
        <NavLink className='gameContainer' key={game.id} to={`/games/${game.id}`}>
          <div
            className='gameImage'
            style={{
              backgroundImage: `url(${game.image || <></>})`,
            }}
          ></div>
          <p className='gameTitle'>{game.title}</p>
        </NavLink>
      ))}
    </div>
  );
};

export default GameList;
