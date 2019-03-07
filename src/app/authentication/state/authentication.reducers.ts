import { Action } from '@ngrx/store';
import { AuthenticationStates } from '../authentication-states';
import { AuthenticationUser } from '../authentication.model';

export const AUTHENTICATION_FEATURE_NAME = 'authentication';

export interface AuthenticationState {
  user: AuthenticationUser;
  userState: string;
  userAttributes: Array<any>;
  username: string;
}

const initialState: AuthenticationState = {
  user: null,
  userState: AuthenticationStates.LOGGEDOUT,
  userAttributes: [],
  username: null
};

export function authenticationReducer(state = initialState, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}


