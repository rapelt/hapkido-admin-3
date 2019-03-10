import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.reducers';
import { AuthenticationStates } from '../authentication-states';
import { SignIn } from '../state/authentication.actions';
import { selectAuthenticationState } from '../state/authentication.selectors';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  signInForm: FormGroup;

  constructor(public store: Store<AppState>, public router: Router) {
  }

  ngOnInit() {
    this.signInForm = new FormGroup({
      'instructor' : new FormControl('', [Validators.required]),
      'password' : new FormControl('', Validators.required)
    });

    this.store.select(selectAuthenticationState).subscribe((userState) => {
      if (userState === AuthenticationStates.LOGGEDIN) {
        console.log('should move to home');
        this.router.navigate(['/home']);
      }
    });
  }

  onSubmit() {
    // TODO Validate form
    this.store.dispatch(new SignIn({password: 'Maelgwn3', username: 'rhig' }));

    console.log('submit');
  }

}
