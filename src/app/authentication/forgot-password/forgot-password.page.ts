import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MessagesService } from '../../messages/messages.service';
import { AppState } from '../../state/app.reducers';
import { ResetPassword, SendForgotPasswordCode } from '../state/authentication.actions';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {


  forgotPasswordForm: FormGroup;
  usernameForm: FormGroup;
  username = null;

  constructor(private store: Store<AppState>, private messageService: MessagesService) {
    console.log('Hello ForgotPasswordComponent Component');
  }

  ngOnInit(): void {
    this.forgotPasswordForm = new FormGroup({
      'verification_code' : new FormControl('', [Validators.required]),
      'password1' : new FormControl('', [Validators.required]),
      'password2' : new FormControl('', Validators.required)
    });

    this.usernameForm = new FormGroup({
      'username' : new FormControl('', [Validators.required])
    });
  }

  forgotPasswordSubmit() {
    if (this.forgotPasswordForm.invalid) {
      this.messageService.updateError.next('You must enter a username and password');
      return;
    }

    if (this.forgotPasswordForm.get('password1').value === this.forgotPasswordForm.get('password2').value) {
      this.store.dispatch(new ResetPassword({
        username: this.username.toString().trim(),
        verification_code: this.forgotPasswordForm.get('verification_code').value.toString().trim(),
        password: this.forgotPasswordForm.get('password1').value.toString().trim()
      }));
    } else {
      this.messageService.updateError.next('Your passwords didn\'t match. Please try again.');
    }
  }

  usernameSubmit() {
    this.username = this.usernameForm.get('username').value.toString().trim();

    this.store.dispatch(new SendForgotPasswordCode({
      username: this.username,
    }));
  }

  backToUserName() {
    this.username = null;
  }
}
