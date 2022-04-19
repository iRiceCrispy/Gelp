import React from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import GameForm from '../Forms/GameForm';
import './GameFormPage.scss';

const GameFormPage = ({ edit }) => {
  const { gameId } = useParams();
  const sessionUser = useSelector(state => state.session.user);
  const currentGame = useSelector(state => state.games[gameId]);

  if (!sessionUser) return <Redirect to='/login' />;
  if (edit && !currentGame) return <Redirect to='/404' />;

  return (
    <div className='gameFormPage'>
      <div className='content'>
        <div className='formContainer'>
          <h2 className='formHeading'>{edit ? 'Update Game Details' : 'Add a Game'}</h2>
          <GameForm
            gameId={gameId}
            sessionUser={sessionUser}
            currentGame={currentGame || {}}
            edit={edit}
          />
        </div>
      </div>
    </div>
  );
};

export default GameFormPage;
