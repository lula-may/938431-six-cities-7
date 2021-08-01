import React from 'react';

export default function Error () {
  return (
    <div className="cities__places-container cities__places-container--empty container">
      <section className="cities__no-places">
        <div className="cities__status-wrapper tabs__content">
          <h2 className="cities__status">We failed to load data.</h2>
          <p className="cities__status-description">Please, check your internet connection or try again later.</p>
        </div>
      </section>
      <div className="cities__right-section"></div>
    </div>
  );
}
