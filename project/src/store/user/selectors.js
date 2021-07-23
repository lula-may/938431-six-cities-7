import {createSelector} from 'reselect';
import {AuthorizationStatus} from '../../const';
import {NameSpace} from '../root-reducer';

const NAME_SPACE = NameSpace.USER;

const getLoginError = (state) => state[NAME_SPACE].isError;

const getUserEmail = (state) => state[NAME_SPACE].userEmail;

const getAuthorizationStatus = (state) => state[NAME_SPACE].authorizationStatus;

const getUserLoadingStatus = (state) => state[NAME_SPACE].isLoading;

const selectIsAuthorized = createSelector(
  getAuthorizationStatus,
  (status) => status === AuthorizationStatus.AUTH,
);

export {getAuthorizationStatus, getLoginError, getUserEmail, getUserLoadingStatus, selectIsAuthorized};
