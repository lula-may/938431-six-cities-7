import {NameSpace} from '../root-reducer';
import {createSelector} from 'reselect';
import {getUniqueItems, filterOffersByCity} from '../../utils';

const NAME_SPACE = NameSpace.FAVORITE;

const getFavoriteOffers = (state) => state[NAME_SPACE].offers;

const getFavoriteLoadingError = (state) => state[NAME_SPACE].isError;

const getFavoriteLoadingStatus = (state) => state[NAME_SPACE].isLoading;

const isFavoritesEmpty = createSelector(
  getFavoriteOffers,
  (offers) => !offers.length,
);

const selectFavoriteCities = createSelector(
  getFavoriteOffers,
  (offers) => getUniqueItems(offers.map(({city}) => city.name)),
);

const selectFavoriteOffersByCities = createSelector(
  getFavoriteOffers,
  selectFavoriteCities,
  (offers, cities) => cities.reduce((acc, city) => {
    acc[city] = filterOffersByCity(city, offers);
    return acc;
  }, {}),
);

export {getFavoriteLoadingError, getFavoriteLoadingStatus, getFavoriteOffers, isFavoritesEmpty, selectFavoriteCities, selectFavoriteOffersByCities};
