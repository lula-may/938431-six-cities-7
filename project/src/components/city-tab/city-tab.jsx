import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import {cn} from '../../utils';

export default function CityTab({isActive, cityName, onTabClick}) {
  const onClick = useCallback((evt) => {
    evt.preventDefault();
    onTabClick(cityName);
  }, [onTabClick, cityName]);

  const className = cn('locations__item-link tabs__item', isActive && 'tabs__item tabs__item--active');

  return (
    <li className="locations__item">
      <a className={className} onClick={onClick}>
        <span>{cityName}</span>
      </a>
    </li>
  );
}

CityTab.propTypes = {
  isActive: PropTypes.bool.isRequired,
  cityName: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
};