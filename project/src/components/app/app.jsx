import React, {useEffect} from 'react';
import {Router as BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import browserHistory from '../../browser-history.js';
import Favorites from '../favorites/favorites.jsx';
import Main from '../main/main.jsx';
import NoAuthRoute from '../no-auth-route/no-auth-route.jsx';
import NotFound from '../not-found/not-found.jsx';
import PrivateRoute from '../private-route/private-route.jsx';
import Room from '../room/room.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import {AppRoute} from '../../const.js';
import {selectOffersByCity} from '../../store/offers/selectors';
import { fetchOfferList } from '../../store/offers/api-actions.js';
import { checkAuth } from '../../store/user/api-actions.js';

function App({fetchOffers, checkAuthStatus}) {
  useEffect(() => {
    fetchOffers();
    checkAuthStatus();
  }, [checkAuthStatus, fetchOffers]);

  return (
    <BrowserRouter history={browserHistory}>
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

App.propTypes = {
  fetchOffers: PropTypes.func.isRequired,
  checkAuthStatus: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  offers: selectOffersByCity(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchOffers: () => dispatch(fetchOfferList()),
  checkAuthStatus: () => dispatch(checkAuth()),
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);
