import {
    createFeatureSelector,
    createSelector,
    MemoizedSelector,
} from '@ngrx/store';
import { Observable } from 'rxjs';
import { getAuthenticationState } from '../authentication/state/authentication.selectors';

export const selectUsername = createSelector(getAuthenticationState, state => {
    return state.user['Username'];
});

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

        return {
            email: email,
            emailVerified: isEmailVerified,
        };
    }
);
