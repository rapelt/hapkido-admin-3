import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MessagesModule } from '../../messages/messages.module';
import { AuthenticationStates } from '../authentication-states';
import { SignIn } from '../state/authentication.actions';

import { SignInPage } from './sign-in.page';

describe('SignInPage', () => {
    let component: SignInPage;
    let fixture: ComponentFixture<SignInPage>;

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
            declarations: [SignInPage],
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

        fixture = TestBed.createComponent(SignInPage);
        component = fixture.componentInstance;
        store = TestBed.get(Store);
        spyOn(store, 'dispatch').and.callThrough();
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should dispatch Sign In when all is correct', () => {
        component.signInForm.setValue({ instructor: 'blarg', password: 'yes' });
        component.onSubmit();
        const action = new SignIn({ username: 'blarg', password: 'yes' });
        expect(store.dispatch).toHaveBeenCalledWith(action);
    });
});
