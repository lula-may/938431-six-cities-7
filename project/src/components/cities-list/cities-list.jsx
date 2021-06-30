import React from 'react';
import PropTypes from 'prop-types';
import {CITIES} from '../../const';
import {cn} from '../../utils';

export default function CitiesList ({currentCity}) {
  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((cityName) => {
        const isActive = cityName === currentCity;
        const tabClass = cn('locations__item-link tabs__item', isActive && 'tabs__item tabs__item--active');
        return (
          <li
            key={cityName}
            className="locations__item"
          >
            <a className={tabClass} onClick={() => {}}>
              <span>{cityName}</span>
            </a>
          </li>
        );},
      )}
    </ul>
  );
}

CitiesList.propTypes = {
  currentCity: PropTypes.string.isRequired,
};
