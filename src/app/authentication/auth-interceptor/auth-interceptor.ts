import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../state/app.reducers';
import { AuthStatesEnum } from 'hapkido-auth-lib';

/*
  Generated class for the AuthInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    accessToken = null;

    constructor(private store: Store<AppState>) {
        console.log('Auth Interceptor Constructor');
        this.store.select('authentication').subscribe(data => {
            console.log('Auth Interceptor - Authentication State Changed');

            if (data.authenticationState === AuthStatesEnum.LoggedIn) {
                console.log('Auth Interceptor - Logged in');

                if (
                    !data ||
                    !data.user ||
                    data.user['signInUserSession'] === undefined
                ) {
                    console.log(
                        'Auth Interceptor - Empty Access Token because user session is undefined'
                    );

                    this.accessToken = '';
                } else {
                    console.log('Auth Interceptor - With access token');

                    this.accessToken =
                        data.user['signInUserSession']['accessToken'][
                            'jwtToken'
                        ];
                }
            }
        });
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${this.accessToken}`,
            },
        });

        return next.handle(req);
    }
}
