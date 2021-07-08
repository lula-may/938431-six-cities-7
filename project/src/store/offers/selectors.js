import {createSelector} from 'reselect';
import { sortOffersByType } from '../../utils';
import {NameSpace} from '../root-reducer';

const NAME_SPACE = NameSpace.OFFERS;

const getOffers = (state) => state[NAME_SPACE].offers;

const getCity = (state) => state[NAME_SPACE].city;

const getSortType = (state) => state[NAME_SPACE].sortType;

const getOffersLoadingStatus = (state) => state[NAME_SPACE].isLoading;

const selectOffersByCity = createSelector(
  getOffers,
  getCity,
  (offers, cityName) => offers.filter(({city}) => city.name === cityName),
);

const selectSortedOffers = createSelector(
  getSortType,
  selectOffersByCity,
  (sortType, offers) => sortOffersByType(offers, sortType),
);

export {getCity, getSortType, getOffersLoadingStatus, selectOffersByCity, selectSortedOffers};
