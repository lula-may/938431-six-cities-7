import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import PropTypes from 'prop-types';

import Favorites from '../favorites/favorites.jsx';
import Main from '../main/main.jsx';
import NotFound from '../not-found/not-found.jsx';
import Room from '../room/room.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import {AppRoute} from '../../const.js';
import {PROP_COMMENT, PROP_OFFER} from '../props.js';
import {getFavoriteOffers} from '../../utils.js';

function App({offers, offersCount, comments}) {
  const favoriteOffers = getFavoriteOffers(offers);
  const [, ...nearOffers] = offers;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <Main
            offers={offers}
            offersCount={offersCount}
          />
        </Route>
        <Route exact path={AppRoute.FAVORITES}>
          <Favorites favoriteOffers={favoriteOffers} />
        </Route>
        <Route exact path={AppRoute.LOGIN}>
          <SignIn />
        </Route>
        <Route exact path={`${AppRoute.ROOM}/:id`}>
          <Room
            comments={comments}
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
  comments: PropTypes.arrayOf(PROP_COMMENT),
  offers: PropTypes.arrayOf(
    PROP_OFFER).isRequired,
  offersCount: PropTypes.number.isRequired,
};

export default App;
