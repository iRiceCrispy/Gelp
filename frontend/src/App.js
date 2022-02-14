import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';
import { restoreUser } from './store/session';
import { loadGames } from './store/games';
import { loadReviews } from './store/revews';
import Splash from './components/Splash';
import Navigation from './components/Navigation';
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SignupFormPage';
import GameFormPage from './components/GameFormPage';
import GamePage from './components/GamePage';
import ReviewFormPage from './components/ReviewFormPage';
import NotFound from './components/404';

const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
};

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadGames());
    dispatch(loadReviews());
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    isLoaded && (
      <ScrollToTop>
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
            <GameFormPage edit={false} />
          </Route>
          <Route exact path={'/games/:gameId(\\d+)'}>
            <Navigation />
            <GamePage />
          </Route>
          <Route path={'/games/:gameId(\\d+)/edit'}>
            <Navigation />
            <GameFormPage edit={true} />
          </Route>
          <Route path={'/games/:gameId(\\d+)/reviews/add'}>
            <Navigation />
            <ReviewFormPage edit={false} />
          </Route>
          <Route path={'/reviews/:reviewId(\\d+)/edit'}>
            <Navigation />
            <ReviewFormPage edit={true} />
          </Route>
          <Route path='/404'>
            <NotFound />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </ScrollToTop>
    )
  );
}

export default App;
