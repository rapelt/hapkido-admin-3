import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getAuthenticationState } from '../authentication/state/authentication.selectors';

export const selectUserSettings = createSelector(
  getAuthenticationState,
  state => {
    return {
      userAttributes: state.userAttributes,
      username: state.user['username']
    };
  }
);
