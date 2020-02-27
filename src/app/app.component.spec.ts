import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { AppComponent } from './app.component';
import { AuthenticationStates } from './authentication/authentication-states';
import {
    ActionTypes,
    SignIn,
    SignOut,
} from './authentication/state/authentication.actions';
import {
    AuthLibModule,
    AuthStatesEnum,
    AuthStateService,
} from 'hapkido-auth-lib';
import { config } from '../environments/environment.test';
import { Router } from '@angular/router';
import { AuthenticationServices } from 'hapkido-auth-lib/lib/services/auth.service';

describe('AppComponent', () => {
    let statusBarSpy;
    let splashScreenSpy;
    let platformReadySpy;
    let platformSpy;

    let store: MockStore<{
        authentication: {
            authenticationState: string;
        };
    }>;

    const initialState = {
        authentication: {
            user: null,
            authenticationState: AuthenticationStates.LOGGEDOUT,
            userAttributes: [],
            username: null,
            session: null,
        },
    };

    beforeEach(async(() => {
        statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
        splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
        platformReadySpy = Promise.resolve();
        platformSpy = jasmine.createSpyObj('Platform', {
            ready: platformReadySpy,
        });

        TestBed.configureTestingModule({
            declarations: [AppComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: StatusBar, useValue: statusBarSpy },
                { provide: SplashScreen, useValue: splashScreenSpy },
                { provide: Platform, useValue: platformSpy },
                provideMockStore({ initialState }),
            ],
            imports: [
                RouterTestingModule.withRoutes([]),
                AuthLibModule.forRoot(config),
            ],
        }).compileComponents();

        store = TestBed.get(Store);
        spyOn(store, 'dispatch').and.callThrough();
    }));

    it('should create the app', async () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should initialize the app', async () => {
        TestBed.createComponent(AppComponent);
        expect(platformSpy.ready).toHaveBeenCalled();
        await platformReadySpy;
        expect(statusBarSpy.styleDefault).toHaveBeenCalled();
        expect(splashScreenSpy.hide).toHaveBeenCalled();
    });

    it('should not show menu if logged out', async () => {
        localStorage.setItem('login', 'false');
        const fixture = await TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        app.ngOnInit();
        expect(app.shouldShowSignOut).toEqual(false);
    });

    it('should signout user', async () => {
        const fixture = await TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;

        app.signout();

        const action = new SignOut();

        expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it('should show menu if logged in', async () => {
        store.setState({
            authentication: {
                authenticationState: AuthenticationStates.LOGGEDIN,
            },
        });
        const authState: AuthStateService = TestBed.get(AuthStateService);
        authState.setIsLoggedIn(AuthStatesEnum.LoggedIn);
        const fixture = await TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        const service = app.ngOnInit();
        expect(app.shouldShowSignOut).toEqual(true);
    });

    // it('should have menu labels', async () => {
    //     store.setState({
    //         authentication: {
    //             authenticationState: AuthenticationStates.LOGGEDIN,
    //         },
    //     });
    //
    //     const fixture = await TestBed.createComponent(AppComponent);
    //     await fixture.detectChanges();
    //     const app = fixture.nativeElement;
    //     const menuItems = app.querySelectorAll('ion-label');
    //     expect(menuItems.length).toEqual(4);
    //     expect(menuItems[0].textContent).toContain('Home');
    //     expect(menuItems[1].textContent).toContain('Students');
    //     expect(menuItems[2].textContent).toContain('Settings');
    // });
    //
    // it('should have urls', async () => {
    //     store.setState({
    //         authentication: {
    //             authenticationState: AuthenticationStates.LOGGEDIN,
    //         },
    //     });
    //
    //     // const authStateService: AuthStateService = TestBed.get(
    //     //     AuthStateService
    //     // );
    //     // authStateService.setIsLoggedIn(AuthStatesEnum.LoggedIn);
    //
    //     const fixture = await TestBed.createComponent(AppComponent);
    //     await fixture.detectChanges();
    //     const app = fixture.nativeElement;
    //
    //     const menuItems = app.querySelectorAll('ion-item');
    //     expect(menuItems.length).toEqual(4);
    //     expect(menuItems[0].getAttribute('ng-reflect-router-link')).toEqual(
    //         '/home'
    //     );
    //     expect(menuItems[1].getAttribute('ng-reflect-router-link')).toEqual(
    //         '/student'
    //     );
    //     expect(menuItems[2].getAttribute('ng-reflect-router-link')).toEqual(
    //         '/settings'
    //     );
    // });
});
