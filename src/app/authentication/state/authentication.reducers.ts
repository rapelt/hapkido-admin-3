import { AuthenticationStates } from '../authentication-states';
import { AuthenticationUser } from '../authentication.model';
import { ActionTypes, AuthActions } from './authentication.actions';
import { CognitoUser } from 'amazon-cognito-identity-js';

export const AUTHENTICATION_FEATURE_NAME = 'authentication';

export interface AuthenticationState {
    user: CognitoUser;
    authenticationState: string;
    userAttributes: any[];
    username: string;
    session: any;
}

const initialState: AuthenticationState = {
    user: null,
    authenticationState: AuthenticationStates.LOGGEDOUT,
    userAttributes: [],
    username: null,
    session: null,
};

export function authenticationReducer(
    state = initialState,
    action: AuthActions
) {
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
                userAttributes: action.payload,
                session: action.payload.session,
            };
        default:
            return state;
    }
}
