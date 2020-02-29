import { Component, OnInit, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Store } from '@ngrx/store';
import { AuthenticationStates } from './authentication/authentication-states';
import {
    SetUserAttributes,
    SignInSuccess,
    SignOut,
} from './authentication/state/authentication.actions';
import { selectAuthenticationState } from './authentication/state/authentication.selectors';
import { GetAllClasses } from './classes/state/classes.actions';
import { AppState } from './state/app.reducers';
import {
    GetAllFamilies,
    GetAllStudents,
} from './students/state/students.actions';
import { AuthStatesEnum, AuthStateService } from 'hapkido-auth-lib';
import { debug } from 'util';
import { take } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home',
        },
        {
            title: 'Students',
            url: '/student',
            icon: 'people',
        },
        {
            title: 'Classes',
            url: '/class',
            icon: 'calendar',
        },
        {
            title: 'Settings',
            url: '/settings',
            icon: 'settings',
        },
    ];

    shouldShowSignOut = true;

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private store: Store<AppState>,
        private authState: AuthStateService
    ) {
        this.initializeApp();
    }

    ngOnInit(): void {
        this.shouldShowSignOut =
            this.authState.isLoggedIn === AuthStatesEnum.LoggedIn;

        this.authState._isLoggedInEvent.pipe(take(1)).subscribe(isLoggedIn => {
            this.shouldShowSignOut = isLoggedIn === AuthStatesEnum.LoggedIn;

            this.store.dispatch(new SignInSuccess(this.authState.cognitoUser));
            this.store.dispatch(
                new SetUserAttributes(this.authState.userAttributes)
            );

            if (this.shouldShowSignOut) {
                this.store.dispatch(new GetAllStudents());
                this.store.dispatch(new GetAllFamilies());
                this.store.dispatch(new GetAllClasses());
            }
        });
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    signout() {
        console.log('logout');
        this.store.dispatch(new SignOut());
    }

    ngOnDestroy() {
        this.authState._isLoggedInEvent.unsubscribe();
        this.authState._messageInEvent.unsubscribe();
    }
}
