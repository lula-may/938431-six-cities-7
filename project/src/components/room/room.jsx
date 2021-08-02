import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect, useRouteMatch} from 'react-router-dom';

import Error from '../error/error.jsx';
import Header from '../header/header.jsx';
import NearOffers from '../near-offers/near-offers.jsx';
import RoomProperty from '../room-property/room-property.jsx';
import Spinner from '../spinner/spinner.jsx';
import { AppRoute } from '../../const.js';
import {fetchCurrentRoom} from '../../store/room/api-actions.js';
import {fetchComments} from '../../store/comments/api-actions.js';
import {fetchNearOffers} from '../../store/nearby/api-actions.js';
import {getRoomLoadingError, getRoomLoadingStatus, getRoomNotFound} from '../../store/room/selectors.js';
import { selectIsAuthorized } from '../../store/user/selectors.js';

function Room() {
  const isAuthorized = useSelector(selectIsAuthorized);
  const isError = useSelector(getRoomLoadingError);
  const isLoading = useSelector(getRoomLoadingStatus);
  const isNotFound = useSelector(getRoomNotFound);
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const id = Number(match.params.id);

  useEffect(() => {
    dispatch(fetchCurrentRoom(id));
    dispatch(fetchComments(id));
    dispatch(fetchNearOffers(id));
  }, [dispatch, id, isAuthorized]);

  const hasData = !isLoading && !isError && !isNotFound;

  if (isNotFound) {
    return <Redirect to={AppRoute.NOT_FOUND} />;
  }
  return (
    <div className="page">
      <Header />
      {isLoading && <Spinner />}
      {isError && <Error />}
      {hasData &&
      <main className="page__main page__main--property" data-testid="room">
        <RoomProperty />
        <div className="container">
          <NearOffers />
        </div>
      </main>}
    </div>
  );
}

export default Room;
