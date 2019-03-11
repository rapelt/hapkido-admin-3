import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { SendEmailVerificationCode, VerifyEmail } from '../authentication/state/authentication.actions';
import { AppState } from '../state/app.reducers';
import { selectUserSettings } from './settings.selectors';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  username = null;
  email = null;
  isEmailVerified = 'false';
  userAttributes = [];
  codeSent = false;
  verifyEmailForm: FormGroup;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.verifyEmailForm = new FormGroup({
      'code' : new FormControl('', [Validators.required])
    });

    this.store.pipe(select(selectUserSettings))
      .subscribe((userSetttings) => {
            console.log(userSetttings);
            this.username = userSetttings.username;
            this.userAttributes =  userSetttings.userAttributes;

        for (const attribute of this.userAttributes) {
          if (attribute.Name === 'email_verified') {
            this.isEmailVerified = attribute.Value;
          }

          if (attribute.Name === 'email') {
            this.email = attribute.Value;
          }
        }
    });
  }

  sendCode() {
    this.store.dispatch(new SendEmailVerificationCode());
    this.codeSent = true;
  }

  verifyEmailSubmit() {
    this.store.dispatch(new VerifyEmail(this.verifyEmailForm.get('code').value));
  }

}
