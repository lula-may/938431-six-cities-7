import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import OffersList from '../offers-list/offers-list.jsx';
import Spinner from '../spinner/spinner.jsx';
import {AuthorizationStatus, CardType} from '../../const.js';
import {getNearOffers, getNearOffersLoadingError, getNearOffersLoadingStatus} from '../../store/nearby/selectors.js';
import {postOffer} from '../../store/favorite/api-actions';
import { getAuthorizationStatus } from '../../store/user/selectors';

function NearOffers() {
  const authorizationStatus = useSelector(getAuthorizationStatus);
  const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;
  const isError = useSelector(getNearOffersLoadingError);
  const isLoading = useSelector(getNearOffersLoadingStatus);
  const offers = useSelector(getNearOffers);
  const dispatch = useDispatch();
  const handleFavoriteButtonClick = useCallback((offer) => {
    isAuthorized && dispatch(postOffer(offer));
  }, [dispatch, isAuthorized]);

  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      {isLoading && <Spinner />}
      {isError && <p style={{textAlign: 'center'}}>We failed to load data. Please, try again later.</p>}
      <div className="near-places__list places__list">
        <OffersList
          cardClassName="near-places__card"
          cardType={CardType.NEAR_PLACES}
          isPremiumShown={false}
          offers={offers}
          onFavoriteButtonClick={handleFavoriteButtonClick}
        />
      </div>
    </section>
  );
}

export default NearOffers;
