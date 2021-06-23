import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppRoute } from '../../const';

function Logo({isActive = false}) {
  const activeClass = isActive ? 'header__logo-link--active' : '';
  return (
    <Link className={`header__logo-link ${activeClass}`} to={AppRoute.ROOT}>
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
    </Link>
  );
}

Logo.propTypes = {
  isActive: PropTypes.bool,
};

export default Logo;
