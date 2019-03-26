import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MockComponent } from '../testing-helpers/mock.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationEffects } from './authentication/state/authentication.effects';
import { AuthSeviceMock } from './authentication/state/authentication.service.mock';
import { MessagesModule } from './messages/messages.module';
import { reducers } from './state/app.reducers';
import { config } from '../environments/environment';
import { AuthenticationServices } from './authentication/state/authentication.services';
import { StudentsEffects } from './students/state/students.effects';
import { StudentsModule } from './students/students.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthenticationEffects, StudentsEffects]),
    StoreDevtoolsModule.instrument(),
    MessagesModule,
    StudentsModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    config.ionicEnvName === 'prod' ? AuthenticationServices : { provide: AuthenticationServices, useClass: AuthSeviceMock },
    // AuthenticationServices
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
