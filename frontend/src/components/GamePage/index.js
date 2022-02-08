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
        <div className='gameDetails'>
          <p>
            Title: <span>{game.title}</span>
          </p>
          <p>
            Description: <span>{game.description}</span>
          </p>
        </div>
        <div>
          <Link to={`/games/${gameId}/edit`}>Edit</Link>
          <button type='button' onClick={() => removeGameEvent()}>
            Delete
          </button>
        </div>
        <div className='gameReviews'>
          Reviews
          {game.Reviews.map(review => (
            <div key={review.id} className='review'>
              <span>Rating: {review.rating}</span>
              <p>{review.body}</p>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default GamePage;
