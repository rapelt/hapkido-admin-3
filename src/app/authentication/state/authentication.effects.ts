import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
  ActionTypes, ForceResetPassword,
  SignIn,
  SignOut
} from './authentication.actions';
import { AuthenticationServices } from './authentication.services';

@Injectable()
export class AuthenticationEffects {

  @Effect()
  signIn = this.actions
    .pipe(
      ofType(ActionTypes.Sign_in),
      mergeMap((action: SignIn) => this.authServices.signIn(action.payload.username, action.payload.password)
      .pipe(
        map(() => EMPTY),
        catchError(() => EMPTY)
        ))
    );

  @Effect()
  signOut = this.actions
    .pipe(
      ofType(ActionTypes.Sign_out),
      tap(() => {
        this.authServices.signout();
        location.reload();
      }),
      map((action: SignOut) => {
        return ({ type: ActionTypes.Sign_out_success });
      }
    ));

  @Effect()
  resetPasswordRequired = this.actions
    .pipe(
      ofType(ActionTypes.Reset_password_required),
      tap(() => {
        this.router.navigateByUrl('authentication/force-password-change');
      }),
      map(() => {
        return ({ type: 'nothing' });
      })
    );

  @Effect()
  forceResetPassword = this.actions
    .pipe(
      ofType(ActionTypes.Force_reset_password),
      tap((action: ForceResetPassword) => {
        this.authServices.passwordChallenge(action.payload.username, action.payload.password);
      }),
      map(() => {
        return ({ type: 'nothing' });
      })
    );

  constructor(
    private actions: Actions,
    private authServices: AuthenticationServices,
    private router: Router,
  ) {

  }

}
