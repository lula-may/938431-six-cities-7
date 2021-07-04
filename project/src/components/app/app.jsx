import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import Favorites from '../favorites/favorites.jsx';
import Main from '../main/main.jsx';
import NotFound from '../not-found/not-found.jsx';
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
        <Route exact path={AppRoute.FAVORITES}>
          <Favorites favoriteOffers={favoriteOffers} />
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <SignIn />
        </Route>
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
