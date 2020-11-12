import { Component, OnInit, OnDestroy } from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Store } from '@ngrx/store';
import {
    SetUserAttributes,
    SignInSuccess,
    SignOut,
} from './app-store/auth-state/authentication.actions';
import { AppState } from './app-store/state/app.reducers';
import {
    AuthenticationServices,
    AuthStatesEnum,
    AuthStateService,
} from 'hapkido-auth-lib';
import { LoadingSpinnerService } from './common/components/loading-spinner/loading-spinner.service';
import { SocketioService } from './common/services/socketio.service';
import { config } from '../environments/environment';
import { Router } from '@angular/router';
import { MessagesService } from './common/messages/messages.service';

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
        private authState: AuthStateService,
        private authService: AuthenticationServices,
        private menu: MenuController,
        private loadingSpinnerService: LoadingSpinnerService,
        private socketService: SocketioService,
        private router: Router,
        private messageService: MessagesService
    ) {
        this.initializeApp();
    }

    ngOnInit(): void {
        if (config.feature_toggle.techniques) {
            this.appPages.push({
                title: 'Techniques',
                url: '/technique',
                icon: 'videocam',
            });
        }

        if (config.feature_toggle.io) {
            this.socketService.setupSocketConnection();
        }

        this.authState._messageInEvent.pipe().subscribe(message => {
            console.log(message);
            this.messageService.updateError.next(message.message);
        });

        this.authService.load().then(() => {
            this.shouldShowSignOut =
                this.authState.isLoggedIn === AuthStatesEnum.LoggedIn;
            console.log(
                'App Component - is logged in ' + this.shouldShowSignOut
            );

            if (this.shouldShowSignOut) {
                this.loggedIn(this.authState.isLoggedIn);
            }

            this.authState._isLoggedInEvent.pipe().subscribe(isLoggedIn => {
                this.loggedIn(isLoggedIn);
            });
        });
    }

    loggedIn(isLoggedIn) {
        this.shouldShowSignOut = isLoggedIn === AuthStatesEnum.LoggedIn;
        if (!this.shouldShowSignOut) {
            return;
        }

        if (this.authState.cognitoUser) {
            const user = {
                username: this.authState.cognitoUser.getUsername(),
                signInUserSession: this.authState.cognitoUser
                    .getSignInUserSession
                    ? this.authState.cognitoUser.getSignInUserSession()
                    : { accessToken: { jwtToken: null } },
            };
            this.store.dispatch(new SignInSuccess(user));
        }

        if (this.authState.userAttributes) {
            this.store.dispatch(
                new SetUserAttributes(this.authState.userAttributes)
            );
        }

        console.log('Sign in is at url: ', this.router.url);
        if (this.router.url === '/authentication/sign-in') {
            console.log('Navigating to home: ', '/home');
            this.router.navigateByUrl('/home');
        }
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }

    signout() {
        this.store.dispatch(new SignOut());
    }

    ngOnDestroy() {
        this.authState._isLoggedInEvent.unsubscribe();
        this.authState._messageInEvent.unsubscribe();
    }

    closeMenu() {
        this.menu.close();
    }
}
