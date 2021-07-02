import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CityTab from '../city-tab/city-tab';
import {CITIES} from '../../const';
import {OFFERS} from '../../mocks/offers';
import {ActionCreator} from '../../store/action';
import { getOffersByCity } from '../../utils';

function CitiesList ({currentCity, onTabClick}) {
  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((cityName) => (
        <CityTab
          key={cityName}
          isActive={cityName === currentCity}
          cityName={cityName}
          onTabClick={onTabClick}
        />
      ))}
    </ul>
  );
}

CitiesList.propTypes = {
  currentCity: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentCity: state.city,
});

const mapDispatchToProps = (dispatch) => ({
  onTabClick: (city) => {
    const offers = getOffersByCity(OFFERS, city);
    dispatch(ActionCreator.setCity(city));
    dispatch(ActionCreator.setOffers(offers));
    dispatch(ActionCreator.resetSortType());
  },
});

export {CitiesList};

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
