import { ActionReducerMap } from '@ngrx/store';
import * as authentication from '../authentication/state/authentication.reducers';


export interface AppState {
  authentication: authentication.AuthenticationState;
}

export const reducers: ActionReducerMap<AppState> = {
  authentication: authentication.authenticationReducer
};
