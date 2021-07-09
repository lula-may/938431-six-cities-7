import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import CitiesList from '../cities-list/cities-list.jsx';
import Logo from '../logo/logo.jsx';
import PlacesEmpty from '../places-empty/places-empty';
import Places from '../places/places';
import Spinner from '../spinner/spinner';

import {PROP_OFFER} from '../props.js';
import {AppRoute, AuthorizationStatus, CITIES} from '../../const.js';
import { cn } from '../../utils.js';
import {getAuthorizationStatus, getUserEmail} from '../../store/user/selectors.js';
import {getCity, getOffersLoadingStatus, selectSortedOffers} from '../../store/offers/selectors.js';


function Main(props) {
  const {authorizationStatus, currentCity, isLoading, offers, userEmail} = props;
  const isAuthorized = authorizationStatus === AuthorizationStatus.AUTH;
  const isActive = true;
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
  authorizationStatus: PropTypes.string.isRequired,
  currentCity: PropTypes.oneOf(CITIES).isRequired,
  userEmail: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  offers: PropTypes.arrayOf(PROP_OFFER),
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  isLoading: getOffersLoadingStatus(state),
  currentCity: getCity(state),
  offers: selectSortedOffers(state),
  userEmail: getUserEmail(state),
});

export {Main};
export default connect(mapStateToProps)(Main);
