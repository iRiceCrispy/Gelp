import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GameForm from '../Forms/GameForm';

const GameFormPage = ({ edit }) => {
  const { gameId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const currentGame = useSelector(state => state.games[gameId]);

  if (!sessionUser) return <Redirect to='/login' />;
  if (edit && !currentGame) return <Redirect to='/404' />;

  return (
    <div className='formContainer'>
      <p className='formTitle'>{edit ? 'Edit Game' : 'Add Game'}</p>
      <GameForm
        gameId={gameId}
        sessionUser={sessionUser}
        currentGame={currentGame || {}}
        edit={edit}
      />
    </div>
  );
};

export default GameFormPage;
