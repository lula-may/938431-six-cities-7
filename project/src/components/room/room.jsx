import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {useRouteMatch} from 'react-router-dom';
import PropTypes from 'prop-types';

import Error from '../error/error.jsx';
import Header from '../header/header.jsx';
import NearOffers from '../near-offers/near-offers.jsx';
import RoomProperty from '../room-property/room-property.jsx';
import Spinner from '../spinner/spinner.jsx';
import {fetchCurrentRoom} from '../../store/room/api-actions.js';
import {fetchComments} from '../../store/comments/api-actions.js';
import {fetchNearOffers} from '../../store/nearby/api-actions.js';
import { getRoomLoadingError, getRoomLoadingStatus } from '../../store/room/selectors.js';

function Room(props) {
  const {
    fetchRoom,
    fetchRoomComments,
    fetchRoomNearOffers,
    isLoading,
    isError,
  } = props;

  const match = useRouteMatch();
  const id = Number(match.params.id);
  useEffect(() => {
    fetchRoom(id);
    fetchRoomComments(id);
    fetchRoomNearOffers(id);
  }, [fetchRoom, fetchRoomComments, fetchRoomNearOffers, id]);

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

Room.propTypes = {
  isError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchRoom: PropTypes.func.isRequired,
  fetchRoomNearOffers: PropTypes.func.isRequired,
  fetchRoomComments: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isError: getRoomLoadingError(state),
  isLoading: getRoomLoadingStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchRoomComments: (id) => dispatch(fetchComments(id)),
  fetchRoomNearOffers: (id) => dispatch(fetchNearOffers(id)),
  fetchRoom: (id) => dispatch(fetchCurrentRoom(id)),
});

export {Room};

export default connect(mapStateToProps, mapDispatchToProps)(Room);
