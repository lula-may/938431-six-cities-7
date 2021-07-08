import {NameSpace} from '../root-reducer';

const NAME_SPACE = NameSpace.USER;

const getUserEmail = (state) => state[NAME_SPACE].userEmail;

const getAuthorizationStatus = (state) => state[NAME_SPACE].authorizationStatus;

const getUserLoadingStatus = (state) => state[NAME_SPACE].isLoading;

export {getAuthorizationStatus, getUserEmail, getUserLoadingStatus};
