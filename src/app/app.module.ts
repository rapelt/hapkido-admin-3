import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthLibComponent, AuthLibModule } from 'hapkido-auth-lib';
import { config } from '../environments/environment';
import { MockComponent } from '../testing-helpers/mock.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './authentication/auth-interceptor/auth-interceptor';
import { AuthenticationEffects } from './authentication/state/authentication.effects';
import { ClassesEffects } from './classes/state/classes.effects';
import { MessagesModule } from './messages/messages.module';
import { reducers } from './state/app.reducers';
import { StudentsEffects } from './students/state/students.effects';
import { StudentsModule } from './students/students.module';
import { AttendanceModule } from './attendance/attendance.module';
import { GradingsModule } from './gradings/gradings.module';

@NgModule({
    declarations: [AppComponent, MockComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([
            AuthenticationEffects,
            StudentsEffects,
            ClassesEffects,
        ]),
        StoreDevtoolsModule.instrument(),
        MessagesModule,
        StudentsModule,
        AttendanceModule,
        HttpClientModule,
        AuthLibModule.forRoot(config),
        GradingsModule,
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
        FormBuilder,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
