import React from 'react';
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
import {getFavoriteOffers} from '../../utils.js';
import {COMMENTS} from '../../mocks/comments';

function App({offers}) {
  const favoriteOffers = getFavoriteOffers(offers);
  const [, ...nearOffers] = offers;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <Main />
        </Route>
        <PrivateRoute
          exact
          path={AppRoute.FAVORITES}
          render={() => <Favorites favoriteOffers={favoriteOffers} />}
        >
        </PrivateRoute>
        <NoAuthRoute
          exact
          path={AppRoute.LOGIN}
          render={() => <SignIn />}
        />
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
};

const mapStateToProps = (state) => ({
  offers: state.offers,
});

export {App};

export default connect(mapStateToProps)(App);
