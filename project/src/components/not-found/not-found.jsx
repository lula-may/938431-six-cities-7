import React from 'react';

function NotFound() {
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
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
                <a href="main.html">Go to main page</a>
              </p>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer">
        <a className="footer__logo-link" href="main.html">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </a>
      </footer>
    </div>

  );
}

export default NotFound;
