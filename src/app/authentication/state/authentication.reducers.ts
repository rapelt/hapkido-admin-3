import { AuthenticationUser } from '../authentication.model';
import { ActionTypes, AuthActions } from './authentication.actions';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { AuthStatesEnum } from 'hapkido-auth-lib';

export const AUTHENTICATION_FEATURE_NAME = 'authentication';

export interface AuthenticationState {
    user: CognitoUser;
    authenticationState: AuthStatesEnum;
    userAttributes: any[];
    username: string;
    session: any;
}

const initialState: AuthenticationState = {
    user: null,
    authenticationState: AuthStatesEnum.Loggedout,
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
            console.log('Auth Reducer - Logged in');
            return {
                ...state,
                user: action.payload,
                authenticationState: AuthStatesEnum.LoggedIn,
            };
        case ActionTypes.Sign_out_success:
            // refresh
            console.log('Auth Reducer - Logged out');

            return {
                ...state,
                authenticationState: AuthStatesEnum.Loggedout,
            };
        case ActionTypes.Set_user_attributes:
            console.log('Auth Reducer - Set Attributes');

            return {
                ...state,
                userAttributes: action.payload,
                session: action.payload.session,
            };
        default:
            return state;
    }
}
