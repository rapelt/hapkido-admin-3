import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AppState } from '../state/app.reducers';
import { AuthenticationStates } from './authentication-states';
import { getAuthenticationState, selectAuthenticationState } from './state/authentication.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanLoad {
  constructor(private router: Router, private store: Store<AppState>) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> {
    return this.store.pipe(
      select(getAuthenticationState),
      take(1),
      map((auth) => {
        return auth.authenticationState === AuthenticationStates.LOGGEDIN;
      }),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigateByUrl('/authentication/sign-in');
        }
      })
    );
  }
}
