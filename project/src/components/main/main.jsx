import React, {useCallback, useState} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import CitiesList from '../cities-list/cities-list.jsx';
import Logo from '../logo/logo.jsx';
import Map from '../map/map.jsx';
import OffersList from '../offers-list/offers-list.jsx';
import {PROP_OFFER} from '../props.js';
import {AppRoute, CardType, CITIES} from '../../const.js';

function Main(props) {
  const [activeCard, setActiveCard] = useState(null);
  const handleCardLeave = useCallback(() => setActiveCard(null), []);

  const {offers, currentCity} = props;
  const offersCount = offers.length;
  const isActive = true;
  const isPremiumShown = true;

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
                    <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              currentCity = {currentCity}
            />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offersCount} places to stay in Amsterdam</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex="0">
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex="0">Popular</li>
                  <li className="places__option" tabIndex="0">Price: low to high</li>
                  <li className="places__option" tabIndex="0">Price: high to low</li>
                  <li className="places__option" tabIndex="0">Top rated first</li>
                </ul>
              </form>
              <div className="cities__places-list places__list tabs__content">
                <OffersList
                  cardClassName="cities__place-card"
                  cardType={CardType.CITIES}
                  isPremiumShown={isPremiumShown}
                  offers={offers}
                  onCardEnter={setActiveCard}
                  onCardLeave={handleCardLeave}
                />
              </div>
            </section>
            <div className="cities__right-section">
              <Map
                activeOffer={activeCard}
                className="cities__map"
                city={offers[0].city}
                offers={offers}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

Main.propTypes = {
  currentCity: PropTypes.oneOf(CITIES).isRequired,
  offers: PropTypes.arrayOf(PROP_OFFER),
};

const mapStateToProps = (state) => ({
  offers: state.offers,
  currentCity: state.city,
});

export {Main};
export default connect(mapStateToProps)(Main);
