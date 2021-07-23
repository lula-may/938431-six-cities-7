import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../../const';
import {logout, setAuthorizationStatus, setError, setUser, startLoading} from './actions.js';

const initialState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  isError: false,
  isLoading: true,
  userEmail: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(logout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
      state.userEmail = null;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.isLoading = false;
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state) => {
      state.isError = true;
      state.isLoading = false;
    })
    .addCase(setUser, (state, action) => {
      state.userEmail = action.payload;
    })
    .addCase(startLoading, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
});

export {reducer};
