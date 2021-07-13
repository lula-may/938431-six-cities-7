import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import OffersList from '../offers-list/offers-list.jsx';
import Spinner from '../spinner/spinner.jsx';
import {CardType} from '../../const.js';
import {PROP_OFFER} from '../props.js';
import {getNearOffers, getNearOffersLoadingError, getNearOffersLoadingStatus} from '../../store/nearby/selectors.js';

function NearOffers({isError, isLoading, offers}) {
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

NearOffers.propTypes = {
  isError: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  offers: PropTypes.arrayOf(PROP_OFFER).isRequired,
};

const mapStateToProps = (state) => ({
  isError: getNearOffersLoadingError(state),
  isLoading: getNearOffersLoadingStatus(state),
  offers: getNearOffers(state),
});

export {NearOffers};

export default connect(mapStateToProps)(NearOffers);
