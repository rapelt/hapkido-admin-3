import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
    ActionTypes,
    SendEmailVerificationCode,
    VerifyEmail,
} from '../app-store/auth-state/authentication.actions';
import { AppState } from '../app-store/state/app.reducers';
import { selectUserAttributes, selectUsername } from './settings.selectors';
import { Router } from '@angular/router';
import { AuthStateService } from 'hapkido-auth-lib';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, OnDestroy {
    username: string = null;
    userAttributes: { email: string; emailVerified: string } = null;
    codeSent = false;
    verifyEmailForm: FormGroup;
    subsc;
    subsc1;
    constructor(
        private store: Store<AppState>,
        private router: Router,
        private actionsSubject: ActionsSubject,
        private authState: AuthStateService
    ) {}

    ngOnInit() {
        this.verifyEmailForm = new FormGroup({
            code: new FormControl('', [Validators.required]),
        });

        if (
            this.authState.cognitoUser &&
            this.authState.cognitoUser.getUsername
        ) {
            this.username = this.authState.cognitoUser.getUsername();
        }

        if (this.authState.userAttributes) {
            this.username = this.authState.cognitoUser.getUsername();
        }

        if (this.authState.userAttributes) {
            const attri: CognitoUserAttribute[] = this.authState
                .userAttributes as CognitoUserAttribute[];

            const email = attri.find(att => att.getName() === 'email');
            const emailVerifiedAttri = attri.find(
                att => att.getName() === 'email_verified'
            );

            const emailVerified = emailVerifiedAttri
                ? emailVerifiedAttri.getValue()
                : 'false';

            this.userAttributes = {
                email: email.getValue(),
                emailVerified: emailVerified,
            };
        }

        this.subsc = this.authState._isLoggedInEvent.subscribe(loggedIn => {
            if (this.authState.cognitoUser) {
                this.username = this.authState.cognitoUser.getUsername();
            }
        });

        this.subsc1 = this.authState._userAttributesEvent.subscribe(() => {
            const attri: CognitoUserAttribute[] = this.authState
                .userAttributes as CognitoUserAttribute[];

            const email = attri.find(att => att.getName() === 'email');
            const emailVerifiedAttri = attri.find(
                att => att.getName() === 'email_verified'
            );

            const emailVerified = emailVerifiedAttri
                ? emailVerifiedAttri.getValue()
                : 'false';

            this.userAttributes = {
                email: email.getValue(),
                emailVerified: emailVerified,
            };
        });
    }

    isFunction(func) {
        return typeof func === 'function';
    }

    sendCode() {
        this.router.navigateByUrl('authentication/verify-email');
    }

    verifyEmailSubmit() {
        this.store.dispatch(
            new VerifyEmail(this.verifyEmailForm.get('code').value)
        );
    }

    ngOnDestroy(): void {
        if (this.subsc && this.subsc1) {
            this.subsc.unsubscribe();
            this.subsc1.unsubscribe();
        }
    }
}
