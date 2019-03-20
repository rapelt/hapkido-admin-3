import {Action} from '@ngrx/store';

export enum ActionTypes {
  Reset_password_required = '[Students] Force Reset Password',
}

export class ResetPasswordRequired implements Action {
  readonly type = ActionTypes.Reset_password_required;
}


export type StudentsActions =
  ResetPasswordRequired;
