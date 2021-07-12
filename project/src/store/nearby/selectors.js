import {NameSpace} from '../root-reducer';

const NAME_SPACE = NameSpace.NEAR_OFFERS;

const getNearOffers = (state) => state[NAME_SPACE].nearOffers;

const getNearOffersLoadingError = (state) => state[NAME_SPACE].isError;

const getNearOffersLoadingStatus = (state) => state[NAME_SPACE].isLoading;

export {getNearOffers, getNearOffersLoadingError, getNearOffersLoadingStatus};
