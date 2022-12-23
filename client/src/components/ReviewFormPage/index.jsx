import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReviewForm from '../Forms/ReviewForm';
import './ReviewFormPage.scss';

const ReviewFormPage = ({ edit }) => {
  const sessionUser = useSelector(state => state.session.user);
  const reviewId = parseInt(useParams().reviewId);
  const currentReview = useSelector(state => state.reviews[reviewId]);
  const gameId = parseInt(useParams().gameId) || currentReview.gameId;
  const currentGame = useSelector(state => state.games[gameId]);

  if (!sessionUser) return <Redirect to='/login' />;
  if ((!edit && !currentGame) || (edit && !currentReview)) return <Redirect to='/404' />;

  return (
    <div className='reviewFormPage'>
      <div className='content'>
        <div className='formContainer'>
          <h2 className='formHeading'>
            {edit
              ? `Edit Reivew for ${currentGame.title}`
              : `Write a Review for ${currentGame.title}`}
          </h2>
          <ReviewForm
            sessionUser={sessionUser}
            currentGame={currentGame}
            currentReview={currentReview || {}}
            edit={edit}
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewFormPage;
