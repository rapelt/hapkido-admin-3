import { TestBed, inject, fakeAsync, tick, async } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { routes } from './authentication-routing.module';
import { AuthenticationStates } from './authentication-states';
import { ForcePasswordChangePageModule } from './force-password-change/force-password-change.module';
import { ForgotPasswordPageModule } from './forgot-password/forgot-password.module';
import { ResetPasswordGuard } from './reset-password.guard';
import { SignInPageModule } from './sign-in/sign-in.module';

describe('ResetPasswordGuardService', () => {
  let service: ResetPasswordGuard = null;
  let router: Router;

  let store: MockStore<{ authentication: {
      authenticationState: string,
    }
  }>;

  const initialState = {
    authentication: {
      user: null,
      authenticationState: AuthenticationStates.LOGGEDOUT,
      userAttributes: [],
      username: null,
      session: null
    }
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ResetPasswordGuard,
        provideMockStore({ initialState }),
      ],
      imports: [
        ForcePasswordChangePageModule,
        SignInPageModule,
        ForgotPasswordPageModule,
        RouterTestingModule.withRoutes(routes),
      ]
    });
  });

  beforeEach(inject([ResetPasswordGuard], (agService: ResetPasswordGuard) => {
    router = TestBed.get(Router);
    store = TestBed.get(Store);
    service = agService;
  }));

  it('shout redirect user to sign in screen',  ((done) => {
    const navigateSpy = spyOn(router, 'navigateByUrl');

    const route = {
      path: null,
      canLoad: [ResetPasswordGuard],
    };

    service.canLoad(route, []).subscribe((something) => {

      console.log(something);
      expect(something).toEqual(false);
      expect(navigateSpy).toHaveBeenCalledWith('/authentication/sign-in');
      done();
    });

  }));


  it('should allow user to get to home screen',  ((done) => {
    const navigateSpy = spyOn(router, 'navigateByUrl');
    const newState = {
      authentication: {
        user: null,
        authenticationState: AuthenticationStates.RESETPASSWORD,
        userAttributes: [],
        username: null,
        session: null
      }
    };


    store.setState(newState);
    const route = {
      path: null,
      canLoad: [ResetPasswordGuard],
    };

    service.canLoad(route, []).subscribe((something) => {
      console.log(something);
      expect(something).toBeTruthy();
      done();
    });

  }));
});
