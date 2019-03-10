import {Action} from '@ngrx/store';

export enum ActionTypes {
  Reset_password = '[Authentication] Reset Password',
  Sign_in = '[Authentication] Sign In',
  Sign_out = '[Authentication] Sign Out',
  Sign_out_success = '[Authentication] Sign Out Success',
  Sign_in_success = '[Authentication] Sign In Success',
  Set_as_admin = '[Authentication] Set As Admin'
}

export class ResetPassword implements Action {
  readonly type = ActionTypes.Reset_password;
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

export class SetAsAdmin implements Action {
  readonly type = ActionTypes.Set_as_admin;
  constructor(public payload) { }
}


export type AuthActions =
  ResetPassword |
  SignIn |
  SignOut |
  SignInSuccess |
  SignOutSuccess |
  SetAsAdmin;
