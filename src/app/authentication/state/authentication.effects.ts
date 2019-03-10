import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ActionTypes, SignIn, SignInSuccess, SignOut } from './authentication.actions';
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
      map((action: SignOut) => {
        this.authServices.signout();
        this.router.navigateByUrl('/authentication/sign-in');
        location.reload();
        return ({ type: ActionTypes.Sign_out_success });
      }
    ));


  @Effect()
  signInSuccess = this.actions
    .pipe(
      ofType(ActionTypes.Sign_in_success),
      map((action: SignInSuccess) => {
        return ({ type: 'Routing Successful' });
      }
    )
  );

  constructor(
    private actions: Actions,
    private authServices: AuthenticationServices,
    private router: Router,
  ) {

  }

}
