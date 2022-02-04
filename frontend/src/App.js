import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';
import * as sessionActions from './store/session';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const user = useSelector(state => state.session.user);

  return (
    isLoaded && (
      <>
        <p>Welcome {user.username}</p>
        <Switch>
          <Route path='/login'>
            <LoginFormPage />
          </Route>
        </Switch>
      </>
    )
  );
}

export default App;
