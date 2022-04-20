import React from 'react';
import { Link, useParams, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteGame } from '../../store/games';
import StarRating from '../StarRating';
import Review from './Review';
import noImage from '../../assets/no-image.png';
import './GamePage.scss';

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
    <div id='gamePage'>
      <header>
        <div className='imageContainer' style={{ backgroundImage: `url(${noImage})` }}>
          {game.image && (
            <img
              src={game.image || noImage}
              alt={game.title}
            />
          )}
        </div>
        <div className='content'>
          <h1 className='title'>{game.title}</h1>
          <div className='averageRating'>
            <StarRating rating={getAvgReview()} />
            <span className='numOfReviews'>
              {reviews.length}
              {' '}
              {reviews.length === 1 ? 'Review' : 'Reviews'}
            </span>
          </div>
          <div>
            <span className='owner'>
              Created by:
              {' '}
              {game.owner.username}
            </span>
            {sessionUser?.id === game.ownerId && (
            <>
              <Link className='btn translucent small bold' to={`/games/${gameId}/edit`}>
                Edit
              </Link>
              <button className='btn translucent small bold' type='button' onClick={() => deleteGameEvent()}>
                Delete
              </button>
            </>
            )}
          </div>
        </div>
      </header>
      <main>
        <div className='content'>
          {(game.url || game.downloadLink || game.releaseDate) && (
          <aside className='details'>
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
          </aside>
          )}
          <section className='options'>
            <Link className='btn' to={`/games/${gameId}/reviews/add`}>
              Add A Review
            </Link>
          </section>
          <section className='about'>
            <h2>About the game:</h2>
            <p>{game.description}</p>
          </section>
          <section className='reviews'>
            <h2>Reviews:</h2>
            {reviews.length
              ? (
                <>
                  {reviews.map(review => (
                    <Review review={review} sessionUser={sessionUser} />
                  ))}
                </>
              )
              : <p>No Reviews</p>}
          </section>
        </div>
      </main>
    </div>
  );
};

export default GamePage;
