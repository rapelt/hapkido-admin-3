import { AuthenticationStates } from '../authentication-states';
import { AuthenticationUser } from '../authentication.model';
import { ActionTypes, AuthActions } from './authentication.actions';

export const AUTHENTICATION_FEATURE_NAME = 'authentication';

export interface AuthenticationState {
  user: AuthenticationUser;
  authenticationState: string;
  userAttributes: Array<any>;
  username: string;
  session: any;
}

const initialState: AuthenticationState = {
  user: null,
  authenticationState: AuthenticationStates.LOGGEDOUT,
  userAttributes: [],
  username: null,
  session: null

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
        authenticationState: AuthenticationStates.LOGGEDOUT,

      };
    case ActionTypes.Reset_password_required:
      // refresh
      return {
        ...state,
        authenticationState: AuthenticationStates.RESETPASSWORD,
      };
    case ActionTypes.Set_user_attributes:
      return {
        ...state,
        userAttributes: action.payload.attributes,
        session: action.payload.session
      };
    default:
      return state;
  }
}


