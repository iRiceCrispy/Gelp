import React from 'react';
import { Link, useParams, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteGame } from '../../store/games';
import Reviews from './Reviews';
import './GamePage.css';

const GamePage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { gameId } = useParams();
  const game = useSelector(state => state.games[gameId]);
  const sessionUser = useSelector(state => state.session.user);
  const reviewsList = useSelector(state => state.reviews);
  const reviews = Object.values(reviewsList)
    .filter(review => review.gameId === game?.id)
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  if (!game) return <Redirect to='/404' />;

  const getAvgReview = () => {
    const avg = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
    return Math.floor(avg);
  };

  const deleteGameEvent = async () => {
    await dispatch(deleteGame(gameId));

    return history.push('/');
  };

  return (
    <div className='gamePage'>
      <div className='gameHeadingContainer'>
        <div
          className='gameHeadingImage'
          style={{
            backgroundImage: `url(${game.image || null})`,
          }}
        />
        <div className='gameHeading'>
          <h1 className='gameHeadingTitle'>{game.title}</h1>
          <div className='averageRating'>
            {[...Array(5)].map((star, i) => (
              <span
                key={i}
                className={i < getAvgReview() ? `star starNum${getAvgReview()}` : 'star'}
              >
                <FontAwesomeIcon icon='fa-solid fa-star' />
              </span>
            ))}
            <span className='numOfReviews'>
              {reviews.length}
              {' '}
              {reviews.length === 1 ? 'Review' : 'Reviews'}
            </span>
          </div>
          <div className='gameSubHeading'>
            <h2 className='gameOwner'>
              Created by:
              {' '}
              {game.owner.username}
            </h2>
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
          </div>
          <Link className='btn btnRed' to={`/games/${gameId}/reviews/add`}>
            Add A Review
          </Link>
        </div>
      </div>
      <div className='gameDetails'>
        <h2 className='about'>
          About the game:
          {' '}
          <p>{game.description}</p>
        </h2>
        {(game.url || game.downloadLink || game.releaseDate) && (
          <div className='details'>
            {game.url && (
              <div>
                <a href={game.url}>Game homepage</a>
              </div>
            )}
            {game.downloadLink && (
              <div>
                <a href={game.downloadLink}>Download Link</a>
              </div>
            )}
            {game.releaseDate && (
              <div>
                <p>
                  Release date:
                  {' '}
                  {game.releaseDate}
                </p>
              </div>
            )}
          </div>
        )}
        <Reviews reviews={reviews} sessionUser={sessionUser} />
      </div>
    </div>
  );
};

export default GamePage;
