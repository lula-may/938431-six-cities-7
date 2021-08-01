import React, { useCallback } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {getClassName} from '../../utils';

export default function CityTab({isActive, cityName, onTabClick}) {
  const onClick = useCallback((evt) => {
    evt.preventDefault();
    onTabClick(cityName);
  }, [onTabClick, cityName]);

  const className = getClassName('locations__item-link tabs__item', isActive && 'tabs__item tabs__item--active');

  return (
    <li className="locations__item">
      <Link className={className} onClick={onClick} to="/">
        <span>{cityName}</span>
      </Link>
    </li>
  );
}

CityTab.propTypes = {
  isActive: PropTypes.bool.isRequired,
  cityName: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired,
};
