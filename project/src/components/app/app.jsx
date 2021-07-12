import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Favorites from '../favorites/favorites.jsx';
import Main from '../main/main.jsx';
import NoAuthRoute from '../no-auth-route/no-auth-route.jsx';
import NotFound from '../not-found/not-found.jsx';
import PrivateRoute from '../private-route/private-route.jsx';
import Room from '../room/room.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import {AppRoute} from '../../const.js';
import {PROP_OFFER} from '../props.js';
import {COMMENTS} from '../../mocks/comments';
import {selectOffersByCity} from '../../store/offers/selectors';
import { fetchOfferList } from '../../store/offers/api-actions.js';
import { checkAuth } from '../../store/user/api-actions.js';

function App({offers, fetchOffers, checkAuthStatus}) {
  const [, ...nearOffers] = offers;
  useEffect(() => {
    fetchOffers();
    checkAuthStatus();
  }, [checkAuthStatus, fetchOffers]);

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
          <Room
            comments={COMMENTS}
            nearOffers={nearOffers}
            offers={offers}
          />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

App.propTypes = {
  offers: PropTypes.arrayOf(
    PROP_OFFER).isRequired,
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
