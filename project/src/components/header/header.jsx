import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import Logo from '../logo/logo';
import {AppRoute, AuthorizationStatus} from '../../const';
import {getAuthorizationStatus, getUserEmail} from '../../store/user/selectors.js';
import { connect } from 'react-redux';

function Header({authorizationStatus, userEmail, isActive}) {
  const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo isActive={isActive} />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link className="header__nav-link header__nav-link--profile" to={AppRoute.FAVORITES}>
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  {isAuthorized
                    ? <span className="header__user-name user__name">{userEmail}</span>
                    : <span className="header__login">Sign in</span>}
                </Link>
              </li>
              {isAuthorized &&
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="#">
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  userEmail: PropTypes.string,
  isActive: PropTypes.bool,
  authorizationStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  userEmail: getUserEmail(state),
});

export default connect(mapStateToProps)(Header);
