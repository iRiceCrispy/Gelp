import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { restoreUser } from './store/session';
import { loadGames } from './store/games';
import { loadReviews } from './store/revews';
import Splash from './components/Splash';
import Auth from './components/Auth';
import Navigation from './components/Navigation';
import SearchResults from './components/SearchResults';
import GameFormPage from './components/GameFormPage';
import GamePage from './components/GamePage';
import ReviewFormPage from './components/ReviewFormPage';
import NotFound from './components/404';

const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
};

const NavWrapper = ({ children }) => (
  <>
    <Navigation />
    {children}
  </>
);

const App = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadGames());
    dispatch(loadReviews());
    dispatch(restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    isLoaded && (
      <div className='app'>
        <Switch>
          <Route exact path='/'>
            <Splash />
          </Route>
          <ScrollToTop>
            <NavWrapper>
              <Switch>
                <Route exact path='/login'>
                  <Auth type='login' />
                </Route>
                <Route exact path='/signup'>
                  <Auth type='signup' />
                </Route>
                <Route exact path='/search'>
                  <SearchResults />
                </Route>
                <Route exact path='/games/add'>
                  <GameFormPage edit={false} />
                </Route>
                <Route exact path={'/games/:gameId(\\d+)'}>
                  <GamePage />
                </Route>
                <Route exact path={'/games/:gameId(\\d+)/edit'}>
                  <GameFormPage edit />
                </Route>
                <Route exact path={'/games/:gameId(\\d+)/reviews/add'}>
                  <ReviewFormPage edit={false} />
                </Route>
                <Route exact path={'/reviews/:reviewId(\\d+)/edit'}>
                  <ReviewFormPage edit />
                </Route>
                <Route exact path='/404'>
                  <NotFound />
                </Route>
                <Route>
                  <Redirect to='/404' />
                </Route>
              </Switch>
            </NavWrapper>
          </ScrollToTop>
        </Switch>
      </div>
    )
  );
};

export default App;
