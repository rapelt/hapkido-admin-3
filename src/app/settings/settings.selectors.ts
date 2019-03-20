import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAuthenticationState } from '../authentication/state/authentication.selectors';

// export const selectUserSettings = createSelector(
//   getAuthenticationState,
//   state => {
//     return {
//       userAttributes: state.userAttributes,
//       username: state.user['username'] ? state.user['username'] : null
//     };
//   }
// );

export const selectUsername = createSelector(
  getAuthenticationState,
  state => {
    return  state.user['username'];
  }
);

export const selectUserAttributes = createSelector(
  getAuthenticationState,
  state => {

    let email = '';
    let isEmailVerified = 'false';
    for (const attribute of state.userAttributes) {
        if (attribute.Name === 'email_verified') {
          isEmailVerified = attribute.Value;
        }

        if (attribute.Name === 'email') {
          email = attribute.Value;
        }
      }

    return  {
      email: email,
      emailVerified: isEmailVerified
    };
  }
);
