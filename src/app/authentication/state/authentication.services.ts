import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '@capacitor/core';
import { Store } from '@ngrx/store';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
  ICognitoUserPoolData
} from 'amazon-cognito-identity-js';
import { from } from 'rxjs';
import { config } from '../../../environments/environment';
import { MessagesService } from '../../messages/messages.service';
import { ResetPasswordRequired, SetUserAttributes, SignInSuccess } from './authentication.actions';
import * as jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationServices {
  private poolData: ICognitoUserPoolData;
  private userPool: CognitoUserPool;
  private cognitoUser: CognitoUser;
  private session: CognitoUserSession;
  private userAttributes;
  private config;

  constructor(private store: Store<AppState>, private messagesService: MessagesService, private router: Router) {
    console.log('using real Cognito');

    this.config = config;
    if (this.config.feature_toggle.cognito_login) {
      this.poolData = {
        UserPoolId: this.config.aws_user_pools_id,
        ClientId: this.config.aws_user_pools_web_client_id
      };
      this.userPool = new CognitoUserPool(this.poolData);
      this.refreshOrResetCreds();
    }



  }

  signIn(username, password) {
    this.cognitoUser = this.getNewCognitoUser(username);

    const promise =  new Promise((resolve, reject) => {
      try {
        this.cognitoUser.authenticateUser(this.authDetails(username, password), this.awsCallBackFunctions());
      } catch (e) { reject(e); }
    });

    return from(promise);

  }

  private getNewCognitoUser (username): CognitoUser {
    return new CognitoUser({ Username: username, Pool: this.userPool });
  }

  awsCallBackFunctions() {
    return {
      onSuccess: this.successfulSignIn.bind(this),
      newPasswordRequired: this.newPasswordIsRequired.bind(this),
      mfaRequired: null,
      onFailure: (error) => {
        this.messagesService.updateError.next(error.message);
        console.log(error);
      },
    };
  }

  successfulSignIn(session) {
    this.session = session;
    console.log(`Signed in user ${this.cognitoUser.getUsername()}. Session valid?: `, session.isValid());
    if (session.isValid() && this.isAdmin(session)) {
      this.store.dispatch(new SignInSuccess(this.cognitoUser));
      this.getAttribute();
      return;
    }

    if (session.isValid() && !this.isAdmin(session)) {
      this.messagesService.updateError.next('This application is for Administrators');
      this.signout();
    }

    // Emit error if not admin
  }

  newPasswordIsRequired(userAttributes, requiredAttributes) {
    // this.userAttributes = userAttributes;
    this.store.dispatch(new ResetPasswordRequired());
    console.log('new Password required');
  }

  private authDetails (username, password): AuthenticationDetails {
    return new AuthenticationDetails({Username: username, Password: password});
  }

  getAttribute() {
    if (this.session && this.session.isValid()) {
      this.cognitoUser.getUserAttributes((err, results) => {
        this.store.dispatch(new SetUserAttributes({attributes: results, session: this.session}));
      });

      // this.store.dispatch(new SetUserName(this.cognitoUser.getUsername()))
    }
  }


  private refreshOrResetCreds () {
    this.cognitoUser = this.userPool.getCurrentUser();

    if (this.cognitoUser !== null) {
      this.refreshSession();
    } else {
      this.resetCreds();
    }
  }

  private refreshSession (): Promise<CognitoUserSession> {
    const self = this;
    return new Promise ((resolve, reject) => {
      self.cognitoUser.getSession((err, session) => {
        if (err) { console.log('Error refreshing user session', err); return reject(err); }

        console.log(
          `${new Date()} - Refreshed session for ${self.cognitoUser.getUsername()}. Valid?: `, session.isValid(),
          ' Admin?:' +  this.isAdmin(session));

        if (session.isValid() && this.isAdmin(session)) {
          this.session = session;
          this.store.dispatch(new SignInSuccess(this.cognitoUser));
          this.getAttribute();
        }
        resolve(session);
      });
    });
  }

  private resetCreds (clearCache: boolean = false) {
    console.log('Resetting credentials for unauth access');
    this.cognitoUser = null;
  }

  isAdmin(session) {
    if (session) {
      const accesstoken = session.getAccessToken();
      const jwtToken = jwt.decode(accesstoken.getJwtToken());
      if (jwtToken['cognito:groups']) {
        return !!jwtToken['cognito:groups'].find((option) => option === 'admin');
      } else {
        return false;
      }
    }
    return false;
  }

  signout () {
    if (this.cognitoUser) {
      this.cognitoUser.signOut();
      this.resetCreds(true);
      this.session = null;
    }
  }

  passwordChallenge(username, password) {
    return new Promise((resolve, reject) => {
      try {
        this.cognitoUser.completeNewPasswordChallenge(password, this.userAttributes, this.awsCallBackFunctions());
      } catch (e) { reject(e); }
    });
  }

  forgotPassword(username, verificationCode, newPassword) {
    this.cognitoUser = this.getNewCognitoUser(username);
    this.cognitoUser.confirmPassword(verificationCode, newPassword, {
      onSuccess: () => {
        console.log('successfully changed password');
        this.router.navigateByUrl('/home');
      },
      onFailure:  (error) => {
        this.messagesService.updateError.next(error.message);
        console.log(error);
      }
    });
  }

  sendForgotPasswordCode(username) {
    this.cognitoUser = this.getNewCognitoUser(username);
    this.cognitoUser.forgotPassword({
      onSuccess: (success) => {
        console.log('successfully send password code');
      },
      onFailure:  (error) => {
        this.router.navigateByUrl('/home');
        this.messagesService.updateError.next(error.message);
        console.log(error);
      },
      inputVerificationCode: () => {
      }
    });
  }

  sendEmailVerificationCode() {
    this.cognitoUser.getAttributeVerificationCode('email', {
      onSuccess: () => {
        console.log('successfully send verification code');
      },
      onFailure: (err) => {
        this.messagesService.updateError.next(err.message);
        console.log(err);
      },
      inputVerificationCode: () => {
        console.log('blarg');
      }
    });
  }

  verifyEmail(verificationCode) {
    this.cognitoUser.verifyAttribute('email', verificationCode, {
      onSuccess: () => {
        this.getAttribute();
      },
      onFailure: (err) => {
        this.messagesService.updateError.next(err.message);
        console.log(err);
      }
    });
  }
}
