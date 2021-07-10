import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import CitiesList from '../cities-list/cities-list.jsx';
import PlacesEmpty from '../places-empty/places-empty';
import Places from '../places/places';
import Spinner from '../spinner/spinner';

import {PROP_OFFER} from '../props.js';
import {CITIES} from '../../const.js';
import { cn } from '../../utils.js';
import {getCity, getOffersLoadingStatus, selectSortedOffers} from '../../store/offers/selectors.js';
import Header from '../header/header.jsx';


function Main(props) {
  const {currentCity, isLoading, offers} = props;
  const isEmpty = offers.length === 0;
  const mainClassnName = cn('page__main page__main--index', isEmpty && 'page__main--index-empty');

  const renderBoard =() => {
    if (isLoading) {
      return <Spinner />;
    }
    if (isEmpty) {
      return <PlacesEmpty  city={currentCity} />;
    }
    return (
      <Places
        city={currentCity}
        offers={offers}
      />
    );
  };

  return (
    <div className="page page--gray page--main">
      <Header isActive />

      <main className={mainClassnName}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              currentCity = {currentCity}
            />
          </section>
        </div>
        <div className="cities">
          {renderBoard()}
        </div>
      </main>
    </div>
  );
}

Main.propTypes = {
  currentCity: PropTypes.oneOf(CITIES).isRequired,
  isLoading: PropTypes.bool.isRequired,
  offers: PropTypes.arrayOf(PROP_OFFER),
};

const mapStateToProps = (state) => ({
  isLoading: getOffersLoadingStatus(state),
  currentCity: getCity(state),
  offers: selectSortedOffers(state),
});

export {Main};
export default connect(mapStateToProps)(Main);
