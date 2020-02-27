import { CUSTOM_ELEMENTS_SCHEMA, forwardRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
    FormsModule,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule,
} from '@angular/forms';
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
    VerifyEmail,
} from '../state/authentication.actions';

import { ForcePasswordChangePage } from './force-password-change.page';

describe('ForcePasswordChangePage', () => {
    let component: ForcePasswordChangePage;
    let fixture: ComponentFixture<ForcePasswordChangePage>;

    let store: MockStore<{
        authentication: {
            authenticationState: string;
        };
    }>;

    const initialState = {
        authentication: {
            user: { username: 'admin' },
            authenticationState: AuthenticationStates.LOGGEDOUT,
            userAttributes: [
                { Name: 'sub', Value: '4a4eb79c-5898-4de7-8540-153515c25f80' },
                { Name: 'email', Value: 'rebekahapelt@gmail.com' },
                { Name: 'email_verified', Value: '' },
            ],
            username: 'admin',
            session: null,
        },
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ForcePasswordChangePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MessagesModule,
                BrowserModule,
                IonicModule.forRoot({
                    _testing: true,
                }),
                RouterTestingModule.withRoutes([]),
            ],
            providers: [provideMockStore({ initialState })],
        }).compileComponents();

        fixture = TestBed.createComponent(ForcePasswordChangePage);
        component = fixture.componentInstance;
        store = TestBed.get(Store);
        spyOn(store, 'dispatch').and.callThrough();
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should dispatch Force Reset Password when all is correct', () => {
        component.resetPasswordForm.setValue({
            username: 'blarg',
            password1: 'yes',
            password2: 'yes',
        });
        component.onResetPassword();
        const action = new ForceResetPassword({
            username: 'blarg',
            password: 'yes',
        });
        expect(store.dispatch).toHaveBeenCalledWith(action);
    });

    it("should send error message when passwords don't match", () => {
        const messageService = TestBed.get(MessagesService);
        spyOn(messageService.updateError, 'next').and.callThrough();

        component.resetPasswordForm.setValue({
            username: 'blarg',
            password1: 'nope',
            password2: 'yes',
        });
        component.onResetPassword();

        expect(messageService.updateError.next).toHaveBeenCalledWith(
            "Your passwords didn't match. Please try again."
        );
    });

    it('should send error message when passwords empty', () => {
        const messageService = TestBed.get(MessagesService);
        spyOn(messageService.updateError, 'next').and.callThrough();

        component.resetPasswordForm.setValue({
            username: 'blarg',
            password1: '',
            password2: '',
        });
        component.onResetPassword();

        expect(messageService.updateError.next).toHaveBeenCalledWith(
            'You must enter a username and password'
        );
    });
});
