import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import CityTab from '../city-tab/city-tab';
import {CITIES} from '../../const';
import {resetSortType, setCity} from '../../store/offers/actions';
import {getCity} from '../../store/offers/selectors';

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
  currentCity: getCity(state),
});

const mapDispatchToProps = (dispatch) => ({
  onTabClick: (city) => {
    dispatch(setCity(city));
    dispatch(resetSortType());
  },
});

export {CitiesList};

export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
