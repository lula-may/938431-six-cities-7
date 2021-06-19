import React from 'react';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.js';

import Logo from '../logo/logo.jsx';

function NotFound() {
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main">
        <div className="container">
          <section className="favorites">
            <div className="favorites__status-wrapper">
              <h1 className="favorites__status"> 404. Page not found.</h1>
              <p className="favorites__status-description">
                <Link to="/">Go to main page</Link>
              </p>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer">
        <Link className="footer__logo-link" to={AppRoute.ROOT}>
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>

  );
}

export default NotFound;
