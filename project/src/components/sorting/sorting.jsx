import React, {useCallback, useState} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {cn} from '../../utils';
import {SortType} from '../../const';
import {ActionCreator} from '../../store/action';

const TypeToText = {
  popular: ' Popular',
  priceUp: ' Price: low to high',
  priceDown: ' Price: high to low',
  rating: ' Top rated first',
};

const sortingTypes = Object.values(SortType);

function Sorting({sortType, onSortTypeChange}) {
  const [isOpened, setIsOpened] = useState(false);
  const onSortingClick = useCallback(() => setIsOpened((prev) => !prev), []);
  const onSortTypeClick = useCallback((evt) => {
    const newType = evt.target.dataset.type;
    if (newType === sortType) {
      return;
    }
    onSortTypeChange(newType);
  }, [onSortTypeChange, sortType]);

  const optionsClassName = cn('places__options places__options--custom', isOpened && 'places__options--opened');

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by&nbsp;</span>
      <span className="places__sorting-type" tabIndex="0" onClick={onSortingClick}>
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
            className={cn('places__option', (type === sortType) && 'places__option--active')}
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

Sorting.propTypes = {
  sortType: PropTypes.oneOf(sortingTypes).isRequired,
  onSortTypeChange: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sortType: state.sortType,
});

const mapDispatchToProps = (dispatch) => ({
  onSortTypeChange: (sortType) => {
    dispatch(ActionCreator.setSortType(sortType));
  },
});

export {Sorting};

export default connect(mapStateToProps, mapDispatchToProps)(Sorting);
