import { Action } from '@ngrx/store';
import { AuthenticationStates } from '../authentication-states';
import { AuthenticationUser } from '../authentication.model';
import { ActionTypes, AuthActions } from './authentication.actions';

export const AUTHENTICATION_FEATURE_NAME = 'authentication';

export interface AuthenticationState {
  user: AuthenticationUser;
  authenticationState: string;
  userAttributes: Array<any>;
  username: string;
  isAdmin: boolean;

}

const initialState: AuthenticationState = {
  user: null,
  authenticationState: AuthenticationStates.LOGGEDOUT,
  userAttributes: [],
  username: null,
  isAdmin: false
};

export function authenticationReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case ActionTypes.Sign_in_success:
      return {
        ...state,
        user: action.payload,
        authenticationState: AuthenticationStates.LOGGEDIN,
      };
    case ActionTypes.Sign_out_success:
      // refresh
      return {
        ...state,
        isAdmin: false
      };
    case ActionTypes.Set_as_admin:
      // refresh
      return {
        ...state,
        isAdmin: action.payload.isAdmin
      };
    default:
      return state;
  }
}


