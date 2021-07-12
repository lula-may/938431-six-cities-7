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
import {getRoomLoadingError, getRoomLoadingStatus } from '../../store/room/selectors.js';

function Room(props) {
  const {
    fetchOffer,
    fetchRoomComments,
    fetchRoomNearOffers,
    isRoomLoadingError,
    isRoomLoading,
  } = props;

  const match = useRouteMatch();
  const id = Number(match.params.id);
  useEffect(() => {
    fetchOffer(id);
  }, [fetchOffer, id]);

  useEffect(() => {
    fetchRoomComments(id);
  }, [fetchRoomComments, id]);

  useEffect(() => {
    fetchRoomNearOffers(id);
  }, [fetchRoomNearOffers, id]);

  const renderBoard = () => {
    if (isRoomLoading) {
      return <Spinner />;
    }
    if (isRoomLoadingError) {
      return <Error />;
    }
    return (
      <main className="page__main page__main--property">
        <RoomProperty />
        <div className="container">
          <NearOffers />
        </div>
      </main>
    );
  };

  return (
    <div className="page">
      <Header />
      {renderBoard()}
    </div>
  );
}

Room.propTypes = {
  fetchOffer: PropTypes.func.isRequired,
  fetchRoomNearOffers: PropTypes.func.isRequired,
  fetchRoomComments: PropTypes.func.isRequired,
  isRoomLoading: PropTypes.bool.isRequired,
  isRoomLoadingError: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  isRoomLoading: getRoomLoadingStatus(state),
  isRoomLoadingError: getRoomLoadingError(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchRoomComments: (id) => dispatch(fetchComments(id)),
  fetchRoomNearOffers: (id) => dispatch(fetchNearOffers(id)),
  fetchOffer: (id) => dispatch(fetchCurrentRoom(id)),
});

export {Room};

export default connect(mapStateToProps, mapDispatchToProps)(Room);
