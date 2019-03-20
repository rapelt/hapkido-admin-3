import { Component, forwardRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MessagesService } from '../../messages/messages.service';
import { AppState } from '../../state/app.reducers';
import { ActionTypes, ForceResetPassword } from '../state/authentication.actions';

@Component({
  selector: 'app-force-password-change',
  templateUrl: './force-password-change.page.html',
  styleUrls: ['./force-password-change.page.scss'],
})
export class ForcePasswordChangePage implements OnInit {
  resetPasswordForm: FormGroup;

  constructor(public store: Store<AppState>, public messageService: MessagesService) {}

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      'username' : new FormControl('', [Validators.required]),
      'password1' : new FormControl('', [Validators.required]),
      'password2' :
        new FormControl(
          '',
          [Validators.required]
        )
    });
  }

  onResetPassword() {
    if (this.resetPasswordForm.invalid) {
      this.messageService.updateError.next('You must enter a username and password');
      return;
    }

    if (this.resetPasswordForm.get('password1').value === this.resetPasswordForm.get('password2').value) {
      const payload = {
        username: this.resetPasswordForm.get('username').value.toString().trim(),
        password: this.resetPasswordForm.get('password1').value.toString().trim()
      };

      this.store.dispatch(new ForceResetPassword(payload));

    } else {
      this.messageService.updateError.next('Your passwords didn\'t match. Please try again.');
    }
  }
}
