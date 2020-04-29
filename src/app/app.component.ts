import {
    Component,
    OnInit,
    OnDestroy,
    ViewChild,
    ElementRef,
} from '@angular/core';

import { MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Store } from '@ngrx/store';
import {
    SetUserAttributes,
    SignInSuccess,
    SignOut,
} from './authentication/state/authentication.actions';
import { GetAllClasses } from './classes/state/classes.actions';
import { AppState } from './state/app.reducers';
import {
    GetAllFamilies,
    GetAllStudents,
} from './students/state/students.actions';
import {
    AuthenticationServices,
    AuthStatesEnum,
    AuthStateService,
} from 'hapkido-auth-lib';
import { delay, take } from 'rxjs/operators';
import { LoadingSpinnerService } from './common/components/loading-spinner/loading-spinner.service';
import { of } from 'rxjs';
import { GetAllPhotos, GetAllVideos } from './media/state/media.actions';
import {
    GetAllTechniques,
    GetAllTechniquesSets,
} from './techniques/state/techniques.actions';
import { GetAllTags } from './tags/state/tags.actions';

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
        private loadingSpinnerService: LoadingSpinnerService
    ) {
        this.initializeApp();
    }

    ngOnInit(): void {
        console.log('App Component - Init method started');
        this.authService.load().then(() => {
            console.log('App Component - Init method started');
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
        console.log('App Component - logged in event ' + isLoggedIn);

        this.shouldShowSignOut = isLoggedIn === AuthStatesEnum.LoggedIn;
        if (!this.shouldShowSignOut) {
            return;
        }

        if (this.authState.cognitoUser) {
            this.store.dispatch(new SignInSuccess(this.authState.cognitoUser));
        }

        if (this.authState.userAttributes) {
            this.store.dispatch(
                new SetUserAttributes(this.authState.userAttributes)
            );
        }

        if (this.shouldShowSignOut) {
            console.log('App Component - Get data');
            this.store.dispatch(new GetAllStudents());
            this.store.dispatch(new GetAllFamilies());
            this.store.dispatch(new GetAllClasses());
            // this.store.dispatch(new GetAllPhotos());
            // this.store.dispatch(new GetAllTechniques());
            // this.store.dispatch(new GetAllTechniquesSets());
            // this.store.dispatch(new GetAllTags());
            // this.store.dispatch(new GetAllVideos());
        }
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

    closeMenu() {
        this.menu.close();
    }
}
