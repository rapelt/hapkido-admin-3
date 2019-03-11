import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.reducers';
import { ActionTypes, ForceResetPassword } from '../state/authentication.actions';

@Component({
  selector: 'app-force-password-change',
  templateUrl: './force-password-change.page.html',
  styleUrls: ['./force-password-change.page.scss'],
})
export class ForcePasswordChangePage implements OnInit {
  resetPasswordForm: FormGroup;

  constructor(private store: Store<AppState>) {
    console.log('Hello ForcedChangePasswordComponent Component');
  }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      'username' : new FormControl('', [Validators.required]),
      'password1' : new FormControl('', [Validators.required]),
      'password2' : new FormControl('', Validators.required)
    });
  }

  onResetPassword() {
    if (this.resetPasswordForm.get('password1').value === this.resetPasswordForm.get('password2').value) {
      const payload = {
        username: this.resetPasswordForm.get('username').value,
        password: this.resetPasswordForm.get('password1').value
      };

      this.store.dispatch(new ForceResetPassword(payload));

    }
  }
}
