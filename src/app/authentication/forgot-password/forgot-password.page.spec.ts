import { CUSTOM_ELEMENTS_SCHEMA, forwardRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MessagesModule } from '../../messages/messages.module';
import { MessagesService } from '../../messages/messages.service';
import { AuthenticationStates } from '../authentication-states';
import {
  ForceResetPassword,
  ResetPassword,
  SendForgotPasswordCode,
  VerifyEmail
} from '../state/authentication.actions';

import { ForgotPasswordPage } from './forgot-password.page';

describe('ForgotPasswordPage', () => {
  let component: ForgotPasswordPage;
  let fixture: ComponentFixture<ForgotPasswordPage>;

  let store: MockStore<{ authentication: {
      authenticationState: string,
    }
  }>;

  const initialState = {
    authentication: {
      user: { username: 'admin'},
      authenticationState: AuthenticationStates.LOGGEDOUT,
      userAttributes: [
        {Name: 'sub', Value: '4a4eb79c-5898-4de7-8540-153515c25f80'},
        {Name: 'email', Value: 'rebekahapelt@gmail.com'},
        {Name: 'email_verified', Value: ''}
      ],
      username: 'admin',
      session: null
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MessagesModule,
        BrowserModule,
        IonicModule.forRoot({
          _testing: true
        }),
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        provideMockStore({ initialState })
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordPage);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch Forgot Password when all is correct', () => {
    component.username = 'username';
    component.forgotPasswordForm.setValue({verification_code: 'blarg', password1: 'yes', password2: 'yes'});
    component.forgotPasswordSubmit();
    const action = new ResetPassword({
      username: 'username',
      verification_code: 'blarg',
      password: 'yes'
    });
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should send error message when passwords don\'t match', () => {
    const messageService = TestBed.get(MessagesService);
    spyOn(messageService.updateError, 'next').and.callThrough();

    component.forgotPasswordForm.setValue({verification_code: 'blarg', password1: 'nope', password2: 'yes'});
    component.forgotPasswordSubmit();

    expect(messageService.updateError.next).toHaveBeenCalledWith('Your passwords didn\'t match. Please try again.');
  });

  it('should send error message when passwords empty', () => {
    component.username = 'username';
    const messageService = TestBed.get(MessagesService);
    spyOn(messageService.updateError, 'next').and.callThrough();

    component.forgotPasswordForm.setValue({verification_code: 'blarg', password1: '', password2: ''});
    component.forgotPasswordSubmit();

    expect(messageService.updateError.next).toHaveBeenCalledWith('You must enter a username and password');
  });

  it('should reset username on back', () => {
    component.username = 'username';
    component.backToUserName();
    expect(component.username).toEqual(null);
  });

  it('should send code on username submit', () => {
    component.usernameForm.setValue({username: 'blarg'});
    component.usernameSubmit();
    const action = new SendForgotPasswordCode({
      username: 'blarg'
    });
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
