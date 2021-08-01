import React, {useMemo } from 'react';
import {useSelector} from 'react-redux';

import CitiesList from '../cities-list/cities-list.jsx';
import Error from '../error/error.jsx';
import PlacesEmpty from '../places-empty/places-empty';
import Places from '../places/places';
import Spinner from '../spinner/spinner';

import {getClassName} from '../../utils.js';
import {getOffersLoadingError, getOffersLoadingStatus, selectCityOffersCount} from '../../store/offers/selectors.js';
import Header from '../header/header.jsx';

function Main() {
  const isLoading = useSelector(getOffersLoadingStatus);
  const isLoadingError = useSelector(getOffersLoadingError);
  const offersCount = useSelector(selectCityOffersCount);
  const isEmpty = !offersCount;

  const mainClassnName = useMemo(() => getClassName('page__main page__main--index', isEmpty && 'page__main--index-empty'), [isEmpty]);

  const renderBoard = useMemo(() => {
    if (isLoading) {
      return <Spinner />;
    }
    if (isLoadingError) {
      return <Error />;
    }
    if (isEmpty) {
      return <PlacesEmpty />;
    }
    return (
      <Places />
    );
  }, [isEmpty, isLoading, isLoadingError]);

  return (
    <div className="page page--gray page--main">
      <Header isActive />

      <main className={mainClassnName}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList />
          </section>
        </div>
        <div className="cities">
          {renderBoard}
        </div>
      </main>
    </div>
  );
}

export default Main;
