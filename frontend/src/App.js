import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import * as sessionActions from './store/session';
import Splash from './components/Splash';
import Navigation from './components/Navigation';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import GameFormPage from './components/GameFormPage';
import GamePage from './components/GamePage';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    isLoaded && (
      <>
        <Switch>
          <Route exact path='/'>
            <Splash />
          </Route>
          <Route path='/login'>
            <Navigation />
            <LoginFormPage />
          </Route>
          <Route path='/signup'>
            <Navigation />
            <SignupFormPage />
          </Route>
          <Route path='/games/add'>
            <Navigation />
            <GameFormPage />
          </Route>
          <Route exact path={'/games/:gameId(\\d+)'}>
            <Navigation />
            <GamePage />
          </Route>
          <Route path={'/games/:gameId(\\d+)/edit'}>
            <Navigation />
            <GameFormPage edit={true} />
          </Route>
          <Route>404 not found</Route>
        </Switch>
      </>
    )
  );
}

export default App;
