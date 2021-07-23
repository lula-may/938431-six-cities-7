import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import Favorites from '../favorites/favorites.jsx';
import Main from '../main/main.jsx';
import NoAuthRoute from '../no-auth-route/no-auth-route.jsx';
import NotFound from '../not-found/not-found.jsx';
import PrivateRoute from '../private-route/private-route.jsx';
import Room from '../room/room.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import {AppRoute} from '../../const.js';
import {checkAuth} from '../../store/user/api-actions.js';
import { useOnAuthChange } from '../../hooks/use-on-auth-change.js';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useOnAuthChange();
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <Main />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
        >
          <Favorites />
        </PrivateRoute>
        <NoAuthRoute
          exact
          path={AppRoute.LOGIN}
        >
          <SignIn/>
        </NoAuthRoute>
        <Route exact path={`${AppRoute.ROOM}/:id`}>
          <Room />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
