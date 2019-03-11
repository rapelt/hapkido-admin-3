import {Action} from '@ngrx/store';

export enum ActionTypes {
  Force_reset_password = '[Authentication] Force Reset Password',
  Reset_password_required = '[Authentication] Reset Password Required',
  Sign_in = '[Authentication] Sign In',
  Sign_out = '[Authentication] Sign Out',
  Sign_out_success = '[Authentication] Sign Out Success',
  Sign_in_success = '[Authentication] Sign In Success',
}

export class ResetPasswordRequired implements Action {
  readonly type = ActionTypes.Reset_password_required;
}

export class ForceResetPassword implements Action {
  readonly type = ActionTypes.Force_reset_password;
  constructor(public payload) { }
}

export class SignIn implements Action {
  readonly type = ActionTypes.Sign_in;

  constructor(public payload) { }
}

export class SignOut implements Action {
  readonly type = ActionTypes.Sign_out;
}

export class SignOutSuccess implements Action {
  readonly type = ActionTypes.Sign_out_success;
}

export class SignInSuccess implements Action {
  readonly type = ActionTypes.Sign_in_success;
  constructor(public payload) { }
}


export type AuthActions =
  ResetPasswordRequired |
  SignIn |
  SignOut |
  SignInSuccess |
  SignOutSuccess |
  ForceResetPassword;
