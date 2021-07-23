import React, {useCallback} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import PropTypes from 'prop-types';

import Logo from '../logo/logo';
import {AppRoute} from '../../const';
import {selectIsAuthorized, getUserEmail} from '../../store/user/selectors.js';
import {logoutUser} from '../../store/user/api-actions';

function Header({isActive}) {
  const isAuthorized = useSelector(selectIsAuthorized);
  const userEmail = useSelector(getUserEmail);
  const dispatch = useDispatch();

  const onClick = useCallback((evt) => {
    evt.preventDefault();
    dispatch(logoutUser());
  }, [dispatch]);

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
                    <Link
                      className="header__nav-link"
                      onClick={onClick}
                      to='/'
                    >
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

Header.propTypes = {
  isActive: PropTypes.bool,
};

export default Header;
