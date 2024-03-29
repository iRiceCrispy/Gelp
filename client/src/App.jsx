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
import About from './components/About';

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

const AboutWrapper = ({ children }) => (
  <>
    {children}
    <About />
  </>
);

const App = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(restoreUser());
      await dispatch(loadGames());
      await dispatch(loadReviews());

      setIsLoaded(true);
    })();
  }, [dispatch]);

  return (
    isLoaded && (
      <div className='app'>
        <Switch>
          <Route exact path='/'>
            <Splash />
          </Route>
          <Route exact path='/login'>
            <AboutWrapper>
              <Auth type='login' />
            </AboutWrapper>
          </Route>
          <Route exact path='/signup'>
            <AboutWrapper>
              <Auth type='signup' />
            </AboutWrapper>
          </Route>
          <ScrollToTop>
            <NavWrapper>
              <Switch>
                <Route exact path='/search'>
                  <AboutWrapper>
                    <SearchResults />
                  </AboutWrapper>
                </Route>
                <Route exact path='/games/add'>
                  <GameFormPage key='create' />
                </Route>
                <Route exact path={'/games/:gameId(\\d+)'}>
                  <AboutWrapper>
                    <GamePage />
                  </AboutWrapper>
                </Route>
                <Route exact path={'/games/:gameId(\\d+)/edit'}>
                  <GameFormPage key='edit' edit />
                </Route>
                <Route exact path={'/games/:gameId(\\d+)/reviews/add'}>
                  <ReviewFormPage key='create' />
                </Route>
                <Route exact path={'/reviews/:reviewId(\\d+)/edit'}>
                  <ReviewFormPage key='edit' edit />
                </Route>
                <Route exact path='/404'>
                  <AboutWrapper>
                    <NotFound />
                  </AboutWrapper>
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
