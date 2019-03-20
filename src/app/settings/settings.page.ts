import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SendEmailVerificationCode, VerifyEmail } from '../authentication/state/authentication.actions';
import { AppState } from '../state/app.reducers';
import { selectUserAttributes, selectUsername } from './settings.selectors';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  username: Observable<string> = null;
  userAttributes: Observable<{email: string, emailVerified: string}> = null;
  codeSent = false;
  verifyEmailForm: FormGroup;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.verifyEmailForm = new FormGroup({
      'code' : new FormControl('', [Validators.required])
    });

    this.username = this.store.select(selectUsername);
    this.userAttributes = this.store.select(selectUserAttributes);
  }

  sendCode() {
    this.store.dispatch(new SendEmailVerificationCode());
    this.codeSent = true;
  }

  verifyEmailSubmit() {
    this.store.dispatch(new VerifyEmail(this.verifyEmailForm.get('code').value));
  }

}
