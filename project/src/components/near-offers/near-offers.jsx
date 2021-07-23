import React from 'react';
import {useSelector} from 'react-redux';
import OffersList from '../offers-list/offers-list.jsx';
import Spinner from '../spinner/spinner.jsx';
import {CardType} from '../../const.js';
import {getNearOffers, getNearOffersLoadingError, getNearOffersLoadingStatus} from '../../store/nearby/selectors.js';

function NearOffers() {
  const isError = useSelector(getNearOffersLoadingError);
  const isLoading = useSelector(getNearOffersLoadingStatus);
  const offers = useSelector(getNearOffers);

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
        />
      </div>
    </section>
  );
}

export default NearOffers;
