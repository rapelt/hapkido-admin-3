import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Store } from '@ngrx/store';
import { AuthenticationStates } from './authentication/authentication-states';
import { SignOut } from './authentication/state/authentication.actions';
import { selectAuthenticationState } from './authentication/state/authentication.selectors';
import { AppState } from './state/app.reducers';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit{
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];

  shouldShowSignOut = true;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private store: Store<AppState>
  ) {
    this.initializeApp();
  }

  ngOnInit(): void {
    this.store.select(selectAuthenticationState).subscribe((state) => {
      this.shouldShowSignOut = state === AuthenticationStates.LOGGEDIN;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  signout() {
    console.log('logout');
    this.store.dispatch(new SignOut());
  }
}
