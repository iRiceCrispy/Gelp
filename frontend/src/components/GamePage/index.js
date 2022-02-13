import { Link, useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteGame } from '../../store/games';
import Reviews from './Reviews.js';
import './GamePage.css';

const GamePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { gameId } = useParams();
  const game = useSelector(state => state.games[gameId]);
  const sessionUser = useSelector(state => state.session.user);

  window.scrollTo(0, 0);

  const deleteGameEvent = async () => {
    await dispatch(deleteGame(gameId));

    return history.push('/');
  };

  if (game) {
    return (
      <div className='gamePage'>
        <div className='gameHeadingContainer'>
          <div
            className='gameHeadingImage'
            style={{
              backgroundImage: `url(${game.image || <></>})`,
            }}
          ></div>
          <div className='gameHeading'>
            <h1>{game.title}</h1>
            {sessionUser?.id === game.ownerId && (
              <div className='gameButtonContainer'>
                <Link className='btn btnTrans' to={`/games/${gameId}/edit`}>
                  Edit
                </Link>
                <button className='btn btnTrans' type='button' onClick={() => deleteGameEvent()}>
                  Delete
                </button>
              </div>
            )}
            <Link className='btn btnRed' to={`/games/${gameId}/reviews/add`}>
              Add A Review
            </Link>
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
            {game.downloadLink && (
              <div>
                <a href={game.downloadLink}>Download Link</a>
              </div>
            )}
            <div>
              <p>Release date: {game.releaseDate}</p>
            </div>
          </div>
          <Reviews game={game} sessionUser={sessionUser} />
        </div>
      </div>
    );
  } else {
    return <p>NO GAME FOUND</p>;
  }
};

export default GamePage;
