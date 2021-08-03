import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getClassName} from '../../utils';
import {SortType} from '../../const';
import {setSortType} from '../../store/offers/actions';
import {getSortType} from '../../store/offers/selectors';

const TypeToText = {
  popular: ' Popular',
  priceUp: ' Price: low to high',
  priceDown: ' Price: high to low',
  rating: ' Top rated first',
};

const sortingTypes = Object.values(SortType);

function Sorting() {
  const sortType = useSelector(getSortType);
  const dispatch = useDispatch();
  const [isOpened, setIsOpened] = useState(false);

  const onSortingClick = useCallback(() => setIsOpened((prev) => !prev), []);

  const onSortTypeClick = useCallback((evt) => {
    const newType = evt.target.dataset.type;
    if (newType === sortType) {
      return;
    }
    dispatch(setSortType(newType));
  }, [dispatch, sortType]);

  const optionsClassName = getClassName('places__options places__options--custom', isOpened && 'places__options--opened');

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by&nbsp;</span>
      <span className="places__sorting-type" tabIndex="0" onClick={onSortingClick} data-testid="sorting-type">
        {TypeToText[sortType]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={optionsClassName}>
        {sortingTypes.map((type) => (
          <li
            key={type}
            data-type={type}
            className={getClassName('places__option', (type === sortType) && 'places__option--active')}
            onClick={onSortTypeClick}
            tabIndex="0"
          >
            {TypeToText[type]}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorting;
