import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import OffersList from '../offers-list/offers-list.jsx';
import {CardType} from '../../const.js';
import {PROP_OFFER} from '../props.js';
import {getNearOffers} from '../../store/nearby/selectors.js';
function NearOffers({offers}) {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
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
  offers: PropTypes.arrayOf(PROP_OFFER).isRequired,
};

const mapStateToProps = (state) => ({
  offers: getNearOffers(state),
});

export {NearOffers};

export default connect(mapStateToProps)(NearOffers);
