import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import { fetchFavoriteList } from '../../store/favorite/api-actions.js';

import FavoriteList from '../favorite-list/favorite-list.jsx';
import Header from '../header/header.jsx';

function Favorites() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchFavoriteList()), [dispatch]);
  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <FavoriteList />
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link"to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default Favorites;
