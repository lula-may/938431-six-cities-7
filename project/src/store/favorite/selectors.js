import {NameSpace} from '../root-reducer';

const NAME_SPACE = NameSpace.FAVORITE;

const getFavoriteOffers = (state) => state[NAME_SPACE].offers;

const getFavoriteLoadingError = (state) => state[NAME_SPACE].isError;

const getFavoriteLoadingStatus = (state) => state[NAME_SPACE].isLoading;

export {getFavoriteLoadingError, getFavoriteLoadingStatus, getFavoriteOffers};
