import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '@capacitor/core';
import { Store } from '@ngrx/store';
import { from } from 'rxjs';
import { MessagesService } from '../../messages/messages.service';
import { ResetPasswordRequired, SetUserAttributes, SignInSuccess } from './authentication.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthSeviceMock {

  constructor(private store: Store<AppState>, private messagesService: MessagesService, private router: Router) {
    console.log('using Mock Cognito');
    const isLoggedIn = localStorage.getItem('login');
    this.refreshOrResetCreds(isLoggedIn);
  }

  signIn(username, password) {
    const promise =  new Promise((resolve, reject) => {
      try {
        if (password !== 'n' && password !== 'e') {
          this.successfulSignIn(username);
        }

        if (password === 'n') {
          this.store.dispatch(new ResetPasswordRequired());
        }

        if (password === 'e') {
          this.messagesService.updateError.next('An error occurred');
        }
        resolve();
      } catch (e) { reject(e); }
    });

    return from(promise);

  }

  successfulSignIn(username = 'rebekah') {
    this.store.dispatch(new SignInSuccess({ username: username}));
    localStorage.setItem('login', 'true');
    this.getAttribute();
  }


  private authDetails (username, password) {
    // return new AuthenticationDetails({Username: username, Password: password});
    return null;

  }

  getAttribute() {
    const user_attri = [
      {Name: 'sub', Value: '4a4eb79c-5898-4de7-8540-153515c25f80'},
      {Name: 'email', Value: 'rebekahapelt@gmail.com'},
      {Name: 'email_verified', Value: 'true'}

    ];
    this.store.dispatch(new SetUserAttributes({attributes: user_attri, session: null}));
  }


  private refreshOrResetCreds (isLoggedIn) {
    if (isLoggedIn === 'true') {
      this.successfulSignIn();
    }
  }

  isAdmin(session) {
    return true;
  }

  signout () {
    localStorage.setItem('login', 'false');
  }

  passwordChallenge(username, password) {
    this.successfulSignIn(username);
  }

  forgotPassword(username, verificationCode, newPassword) {
    if (newPassword !== 'e') {
      localStorage.setItem('login', 'true');
      this.successfulSignIn(username);
    }

    if (newPassword === 'e') {
      this.messagesService.updateError.next('An error occurred');
    }
  }

  sendForgotPasswordCode(username) {
  }

  sendEmailVerificationCode() {
  }

  verifyEmail(verificationCode) {
    this.getAttribute();
  }
}
