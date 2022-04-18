import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReviewForm from '../Forms/ReviewForm';
import './ReviewFormPage.scss';

const ReviewFormPage = ({ edit }) => {
  const sessionUser = useSelector(state => state.session.user);
  const gameId = parseInt(useParams().gameId);
  const reviewId = parseInt(useParams().reviewId);
  const currentGame = useSelector(state => state.games[gameId]);
  const currentReview = useSelector(state => state.reviews[reviewId]);

  if (!sessionUser) return <Redirect to='/login' />;
  if ((!edit && !currentGame) || (edit && !currentReview)) return <Redirect to='/404' />;

  return (
    <div className='formContainer'>
      <p className='formTitle'>
        {edit
          ? `Edit Reivew for ${currentGame?.title || currentReview.game.title}`
          : `Add Review for ${currentGame?.title || currentReview.game.title}`}
      </p>
      <ReviewForm
        sessionUser={sessionUser}
        gameId={gameId}
        currentReview={currentReview || {}}
        edit={edit}
      />
    </div>
  );
};

export default ReviewFormPage;
