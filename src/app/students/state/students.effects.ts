import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
  ActionTypes
} from './students.actions';
import { StudentsServices } from './students.services';

@Injectable()
export class StudentsEffects {


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

  constructor(
    private actions: Actions,
    private router: Router,
  ) {

  }

}
