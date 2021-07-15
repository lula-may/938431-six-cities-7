import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useRouteMatch} from 'react-router-dom';

import Error from '../error/error.jsx';
import Header from '../header/header.jsx';
import NearOffers from '../near-offers/near-offers.jsx';
import RoomProperty from '../room-property/room-property.jsx';
import Spinner from '../spinner/spinner.jsx';
import {fetchCurrentRoom} from '../../store/room/api-actions.js';
import {fetchComments} from '../../store/comments/api-actions.js';
import {fetchNearOffers} from '../../store/nearby/api-actions.js';
import {getRoomLoadingError, getRoomLoadingStatus} from '../../store/room/selectors.js';

function Room() {
  const isError = useSelector(getRoomLoadingError);
  const isLoading = useSelector(getRoomLoadingStatus);
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const id = Number(match.params.id);

  useEffect(() => {
    dispatch(fetchComments(id));
    dispatch(fetchNearOffers(id));
    dispatch(fetchCurrentRoom(id));
  }, [dispatch, id]);

  const hasData = !(isLoading || isError);

  return (
    <div className="page">
      <Header />
      {isLoading && <Spinner />}
      {isError && <Error />}
      {hasData &&
      <main className="page__main page__main--property">
        <RoomProperty />
        <div className="container">
          <NearOffers />
        </div>
      </main>}
    </div>
  );
}

export default Room;
