import React, {useEffect, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import { fetchFavoriteList } from '../../store/favorite/api-actions.js';
import { isFavoritesEmpty } from '../../store/favorite/selectors.js';

import FavoriteList from '../favorite-list/favorite-list.jsx';
import FavoritesEmpty from '../favorites-empty/favorites-empty.jsx';
import Header from '../header/header.jsx';

function Favorites() {
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchFavoriteList()), [dispatch]);
  const isEmpty = useSelector(isFavoritesEmpty);

  const content = useMemo(() => {
    if (isEmpty) {
      return <FavoritesEmpty />;
    }
    return (
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <FavoriteList />
        </div>
      </main>
    );
  }, [isEmpty]);

  return (
    <div className="page">
      <Header />
      {content}
      <footer className="footer container">
        <Link className="footer__logo-link"to="/">
          <img className="footer__logo" src="img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export default Favorites;
