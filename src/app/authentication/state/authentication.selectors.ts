import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthenticationState } from './authentication.reducers';
import * as fromAuthentication from './authentication.reducers';

export const getAuthenticationState = createFeatureSelector<AuthenticationState>(
  fromAuthentication.AUTHENTICATION_FEATURE_NAME
);

export const selectAuthenticationUser = createSelector(
  getAuthenticationState,
  state => state.user
);

export const selectAuthenticationState = createSelector(
  getAuthenticationState,
  state => state.authenticationState
);
