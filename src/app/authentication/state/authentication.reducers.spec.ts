import { AuthenticationStates } from '../authentication-states';
import {
  ResetPasswordRequired,
  SetUserAttributes, SignIn,
  SignInSuccess,
  SignOut,
  SignOutSuccess
} from './authentication.actions';
import * as reducer from './authentication.reducers';

describe('Authentication reducers', () => {
  it('should sign out user', () => {
    const authentication = {
      user: null,
      authenticationState: AuthenticationStates.LOGGEDIN,
      userAttributes: [],
      username: null,
      session: null
    };

    const expectedAuthentication = {
      user: null,
      authenticationState: AuthenticationStates.LOGGEDOUT,
      userAttributes: [],
      username: null,
      session: null
    };


    expect(reducer.authenticationReducer(authentication, new SignOutSuccess())).toEqual(expectedAuthentication);
  });

  it('should sign in user', () => {
    const authentication = {
      user: null,
      authenticationState: AuthenticationStates.LOGGEDOUT,
      userAttributes: [],
      username: null,
      session: null
    };

    const expectedAuthentication = {
      user: {},
      authenticationState: AuthenticationStates.LOGGEDIN,
      userAttributes: [],
      username: null,
      session: null
    };


    expect(reducer.authenticationReducer(authentication, new SignInSuccess({}))).toEqual(expectedAuthentication);
  });

  it('should set reset password required', () => {
    const authentication = {
      user: null,
      authenticationState: AuthenticationStates.LOGGEDOUT,
      userAttributes: [],
      username: null,
      session: null
    };

    const expectedAuthentication = {
      user: null,
      authenticationState: AuthenticationStates.RESETPASSWORD,
      userAttributes: [],
      username: null,
      session: null
    };


    expect(reducer.authenticationReducer(authentication, new ResetPasswordRequired())).toEqual(expectedAuthentication);
  });

  it('should set user attributes', () => {
    const authentication = {
      user: null,
      authenticationState: AuthenticationStates.LOGGEDIN,
      userAttributes: [],
      username: null,
      session: null
    };

    const expectedAuthentication = {
      user: null,
      authenticationState: AuthenticationStates.LOGGEDIN,
      userAttributes: [{Name: 'sub', Value: '4a4eb79c-5898-4de7-8540-153515c25f80'}],
      username: null,
      session: {}
    };

    const attributes = {
      attributes: [
        {Name: 'sub', Value: '4a4eb79c-5898-4de7-8540-153515c25f80'},
      ],
      session: {}
    };


    expect(reducer.authenticationReducer(authentication, new SetUserAttributes(attributes))).toEqual(expectedAuthentication);
  });

  it('should return default', () => {
    const authentication = {
      user: null,
      authenticationState: AuthenticationStates.LOGGEDOUT,
      userAttributes: [],
      username: null,
      session: null
    };



    expect(reducer.authenticationReducer(authentication, new SignOut())).toEqual(authentication);
  });
});
