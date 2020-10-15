import {Action} from '@ngrx/store';

export enum ActionTypes {
  Force_reset_password = '[Authentication] Force Reset Password',
  Reset_password_required = '[Authentication] Reset Password Required',
  Forgot_password_code = '[Authentication] Forgot Password Code',
  Email_verification_code = '[Authentication] Email Verification Code',
  Reset_password = '[Authentication] Reset Password',
  Sign_in = '[Authentication] Sign In',
  Sign_out = '[Authentication] Sign Out',
  Sign_out_success = '[Authentication] Sign Out Success',
  Sign_in_success = '[Authentication] Sign In Success',
  Set_user_attributes = '[Authentication] Set User Attributes',
  Verify_email = '[Authentication] Verify email',

}

export class ResetPasswordRequired implements Action {
  readonly type = ActionTypes.Reset_password_required;
}

export class ResetPassword implements Action {
  readonly type = ActionTypes.Reset_password;
  constructor(public payload) { }
}

export class SetUserAttributes implements Action {
  readonly type = ActionTypes.Set_user_attributes;
  constructor(public payload) { }
}

export class SendForgotPasswordCode implements Action {
  readonly type = ActionTypes.Forgot_password_code;
  constructor(public payload) { }
}

export class SendEmailVerificationCode implements Action {
  readonly type = ActionTypes.Email_verification_code;
}

export class VerifyEmail implements Action {
  readonly type = ActionTypes.Verify_email;
  constructor(public payload) { }
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
  ForceResetPassword |
  ResetPassword |
  SendForgotPasswordCode |
  SetUserAttributes |
  SendEmailVerificationCode |
  VerifyEmail;
