import React, {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import CityTab from '../city-tab/city-tab';
import {CITIES} from '../../const';
import {resetSortType, setCity} from '../../store/offers/actions';
import {getCity} from '../../store/offers/selectors';

function CitiesList() {
  const currentCity = useSelector(getCity);
  const dispatch = useDispatch();
  const onTabClick = useCallback((city) => {
    dispatch(setCity(city));
    dispatch(resetSortType());
  }, [dispatch]);
  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((cityName) => (
        <CityTab
          key={cityName}
          isActive={cityName === currentCity}
          cityName={cityName}
          onTabClick={onTabClick}
        />
      ))}
    </ul>
  );
}

export default CitiesList;
