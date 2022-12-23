import React from 'react';
import { Link, useParams, useHistory, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
          <aside className='details'>
            {(game.url || game.downloadLink || game.releaseDate)
              ? (
                <>
                  {game.url && (
                  <div className='item link'>
                    <span className='text'>
                      <a href={game.url} target='_blank' rel='noreferrer'>{game.url}</a>
                    </span>
                    <span className='icon'>
                      <a href={game.url} target='_blank' rel='noreferrer'>
                        <FontAwesomeIcon icon='fa-solid fa-up-right-from-square' />
                      </a>
                    </span>
                  </div>
                  )}
                  {game.downloadLink && (
                  <div className='item link'>
                    {game.downloadLink.includes('store.steampowered')
                      ? (
                        <>
                          <span className='text'>
                            <a href={game.downloadLink} target='_blank' rel='noreferrer'>Steam link</a>
                          </span>
                          <span className='icon'>
                            <a href={game.downloadLink} target='_blank' rel='noreferrer'>
                              <FontAwesomeIcon icon='fa-brands fa-steam' />
                            </a>
                          </span>
                        </>
                      )
                      : (
                        <>
                          <span className='text'>
                            <a href={game.downloadLink} target='_blank' rel='noreferrer'>Download link</a>
                          </span>
                          <span className='icon'>
                            <a href={game.downloadLink} target='_blank' rel='noreferrer'>
                              <FontAwesomeIcon icon='fa-solid fa-download' />
                            </a>
                          </span>
                        </>
                      )}
                  </div>
                  )}
                  {game.releaseDate && (
                  <div className='item'>
                    <span className='text'>
                      Release Date:
                      {' '}
                      {game.releaseDate}
                    </span>
                    <span className='icon'>
                      <FontAwesomeIcon icon='fa-solid fa-calendar-days' />
                    </span>
                  </div>
                  )}
                </>
              )
              : (
                <div className='item'>
                  <span className='text'>No additional details</span>
                  <span>
                    <Link className='btn' to={`/games/${gameId}/edit`}>
                      Add Details
                    </Link>
                  </span>
                </div>
              )}
          </aside>
          <section className='options'>
            <Link className='btn' to={`/games/${gameId}/reviews/add`}>
              <FontAwesomeIcon icon='fa-regular fa-star' />
              {' '}
              Write A Review
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
                    <Review key={review.id} review={review} sessionUser={sessionUser} />
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
