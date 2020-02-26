import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import {
    ActionTypes,
    ForceResetPassword,
    ResetPassword,
    SendEmailVerificationCode,
    SendForgotPasswordCode,
    SignIn,
    SignOut,
    VerifyEmail,
} from './authentication.actions';

@Injectable()
export class AuthenticationEffects {
    // @Effect()
    // signIn = this.actions.pipe(
    //     ofType(ActionTypes.Sign_in),
    //     mergeMap((action: SignIn) =>
    //         this.authServices
    //             .signIn(action.payload.username, action.payload.password)
    //             .pipe(
    //                 map(() => {
    //                     return { type: 'nothing' };
    //                 }),
    //                 catchError(() => {
    //                     return null;
    //                 })
    //             )
    //     )
    // );

    // @Effect()
    // signOut = this.actions.pipe(
    //     ofType(ActionTypes.Sign_out),
    //     tap(() => {
    //         this.authServices.signout();
    //         location.reload();
    //     }),
    //     map((action: SignOut) => {
    //         return { type: ActionTypes.Sign_out_success };
    //     })
    // );

    // @Effect()
    // resetPasswordRequired = this.actions.pipe(
    //     ofType(ActionTypes.Reset_password_required),
    //     tap(() => {
    //         this.router.navigateByUrl('authentication/force-password-change');
    //     }),
    //     map(() => {
    //         return { type: 'nothing' };
    //     })
    // );

    // @Effect()
    // forceResetPassword = this.actions.pipe(
    //     ofType(ActionTypes.Force_reset_password),
    //     tap((action: ForceResetPassword) => {
    //         this.authServices.passwordChallenge(
    //             action.payload.username,
    //             action.payload.password
    //         );
    //     }),
    //     map(() => {
    //         return { type: 'nothing' };
    //     })
    // );

    // @Effect()
    // resetPassword = this.actions.pipe(
    //     ofType(ActionTypes.Reset_password),
    //     tap((action: ResetPassword) => {
    //         this.authServices.forgotPassword(
    //             action.payload.username,
    //             action.payload.verification_code,
    //             action.payload.password
    //         );
    //     }),
    //     map(() => {
    //         return { type: 'nothing' };
    //     })
    // );

    // @Effect()
    // sendForgotPasswordCode = this.actions.pipe(
    //     ofType(ActionTypes.Forgot_password_code),
    //     tap((action: SendForgotPasswordCode) => {
    //         this.authServices.sendForgotPasswordCode(action.payload.username);
    //     }),
    //     map(() => {
    //         return { type: 'nothing' };
    //     })
    // );

    // @Effect()
    // sendEmailVerificationCode = this.actions.pipe(
    //     ofType(ActionTypes.Email_verification_code),
    //     tap((action: SendEmailVerificationCode) => {
    //         this.authServices.sendEmailVerificationCode();
    //     }),
    //     map(() => {
    //         return { type: 'nothing' };
    //     })
    // );

    // @Effect()
    // verifyEmail = this.actions.pipe(
    //     ofType(ActionTypes.Verify_email),
    //     tap((action: VerifyEmail) => {
    //         this.authServices.verifyEmail(action.payload);
    //     }),
    //     map(() => {
    //         return { type: 'nothing' };
    //     })
    // );

    constructor(private actions: Actions, private router: Router) {}
}
