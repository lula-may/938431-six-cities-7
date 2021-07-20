import {NameSpace} from '../root-reducer';
import {createSelector} from 'reselect';

const NAME_SPACE = NameSpace.FAVORITE;

const getFavoriteOffers = (state) => state[NAME_SPACE].offers;

const getFavoriteLoadingError = (state) => state[NAME_SPACE].isError;

const getFavoriteLoadingStatus = (state) => state[NAME_SPACE].isLoading;

const isFavoritesEmpty = createSelector(
  getFavoriteOffers,
  (offers) => !offers.length,
);

export {getFavoriteLoadingError, getFavoriteLoadingStatus, getFavoriteOffers, isFavoritesEmpty};
