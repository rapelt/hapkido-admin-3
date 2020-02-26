import { AuthenticationStates } from '../authentication-states';
import * as selectors from './authentication.selectors';

describe('Authentication Selectors', () => {
    const state = {
        authentication: {
            user: null,
            authenticationState: AuthenticationStates.LOGGEDOUT,
            userAttributes: [],
            username: null,
            session: null,
        },
    };

    // it('should select user authentication state', () => {
    //   expect(selectors.selectAuthenticationState(state)).toBe(AuthenticationStates.LOGGEDOUT);
    // });
    //
    // it('should select user', () => {
    //   expect(selectors.selectAuthenticationUser(state)).toBe(state.authentication.user);
    // });
    //
    // it('should select user', () => {
    //   expect(selectors.getAuthenticationState(state)).toBe(state.authentication);
    // });
});
