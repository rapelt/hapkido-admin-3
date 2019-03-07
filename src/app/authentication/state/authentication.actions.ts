import {Action} from '@ngrx/store';

export const RESET_PASSWORD = 'RESET_PASSWORD';
export const SIGNED_IN = 'SIGNED_IN';
export const SIGN_OUT = 'SIGN_OUT';

export enum ActionTypes {
  Reset_password = '[Authentication] Reset Password',
  Sign_in = '[Authentication] Sign In',
  Sign_out = '[Authentication] Sign Out',
}

export class ResetPassword implements Action {
  readonly type = ActionTypes.Reset_password;
}

export class SignIn implements Action {
  readonly type = ActionTypes.Sign_in;
}

export class SignOut implements Action {
  readonly type = ActionTypes.Sign_out;
}
