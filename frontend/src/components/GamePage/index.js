import { useEffect, useState } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGame, removeGame } from '../../store/games';
import './GamePage.css';

const GamePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { gameId } = useParams();
  const game = useSelector(state => state.games.current);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getGame(gameId)).then(() => setIsLoaded(true));
  }, [dispatch, gameId]);

  const removeGameEvent = () => {
    dispatch(removeGame(gameId));

    return history.push('/');
  };

  return (
    isLoaded && (
      <div className='gamePage'>
        <div
          className='gameImage'
          style={{
            backgroundImage: `url(${game.image})`,
          }}
        >
          <div className='gameHeading'>
            <h1>{game.title}</h1>
            <div className='buttonContainer'>
              <Link className='btn' to={`/games/${gameId}/edit`}>
                Edit
              </Link>
              <button className='btn' type='button' onClick={() => removeGameEvent()}>
                Delete
              </button>
            </div>
          </div>
        </div>
        <div className='gameDetails'>
          <h2 className='about'>
            About the game: <p>{game.description}</p>
          </h2>
          <div className='details'>
            <div>
              <a href={game.url}>Game homepage</a>
            </div>
            <div>
              <a href={game.steamUrl}>Steam url</a>
            </div>
            <div>
              <p>Release date: {game.releaseDate}</p>
            </div>
          </div>
          <div className='gameReviews'>
            <h2>Reviews</h2>
            {game.Reviews.map(review => (
              <div key={review.id} className='review'>
                <span>Rating: {review.rating}</span>
                <p>{review.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default GamePage;
