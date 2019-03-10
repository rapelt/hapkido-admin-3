import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, take, tap, withLatestFrom } from 'rxjs/operators';
import { AppState } from '../state/app.reducers';
import { AuthenticationStates } from './authentication-states';
import { selectAuthenticationState, selectIsAdmin } from './state/authentication.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanLoad {
  constructor(private router: Router, private store: Store<AppState>) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.pipe(
      select(selectAuthenticationState),
      take(1),
      withLatestFrom(
        this.store.pipe(select(selectIsAdmin))
      ),
      map(([authState, isAdmin]) => {
        return authState === AuthenticationStates.LOGGEDIN;
        // return true;
      }),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigateByUrl('/authentication/sign-in');
        }
      })
    );


    // return this.authService.userIsAuthenticated.pipe(
    //   take(1),
    //   switchMap(isAuthenticated => {
    //     if (!isAuthenticated) {
    //       return this.authService.autoLogin();
    //     } else {
    //       return of(isAuthenticated);
    //     }
    //   }),
    //   tap(isAuthenticated => {
    //     if (!isAuthenticated) {
    //       this.router.navigateByUrl('/auth');
    //     }
    //   })
    // );
  }
}
