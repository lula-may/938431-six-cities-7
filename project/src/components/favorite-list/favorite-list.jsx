import React from 'react';
import {useSelector} from 'react-redux';

import FavoriteCity from '../favorite-city/favorite-city';
import {selectFavoriteCities} from '../../store/favorite/selectors';

function FavoriteList() {
  const cities = useSelector(selectFavoriteCities);

  return (
    <section className="favorites">
      <h1 className="favorites__title">Saved listing</h1>
      <ul className="favorites__list">
        {cities.map((city) => (
          <FavoriteCity key={city} city={city} />
        ))}
      </ul>
    </section>
  );
}

export default FavoriteList;
