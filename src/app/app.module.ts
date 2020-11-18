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
import { AuthLibModule } from 'hapkido-auth-lib';
import { config, environment } from '../environments/environment';
import { MockComponent } from '../testing-helpers/mock.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './authentication/auth-interceptor/auth-interceptor';
import { AuthenticationEffects } from './app-store/auth-state/authentication.effects';
import { ClassesEffects } from './app-store/classes-state/classes.effects';
import { reducers } from './app-store/state/app.reducers';
import { StudentsEffects } from './app-store/student-state/students.effects';
import { StudentsModule } from './students/students.module';
import { AttendanceModule } from './attendance/attendance.module';
import { GradingsModule } from './gradings/gradings.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CommonComponentsModule } from './common/common-components.module';
import { TechniquesEffects } from './app-store/technique-state/techniques.effects';
import { AutoCompleteModule } from 'ionic4-auto-complete';
import { TagsModule } from './tags/tags.module';
import { TagsEffects } from './app-store/tags-state/tags.effects';
import { MediaEffects } from './app-store/media-state/media.effects';
import { TechniquesDataDispatcher } from './techniques/techniques-data.resolver';
import { ClassesDataDispatcher } from './classes/classes-data.resolver';
import { StudentsDataDispatcher } from './students/students-data.resolver';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

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
            TechniquesEffects,
            TagsEffects,
            MediaEffects,
        ]),
        StoreDevtoolsModule.instrument(),
        StudentsModule,
        AttendanceModule,
        HttpClientModule,
        AuthLibModule.forRoot(config),
        GradingsModule,
        AutoCompleteModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
        }),
        CommonComponentsModule,
        TagsModule,
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
        TechniquesDataDispatcher,
        ClassesDataDispatcher,
        StudentsDataDispatcher,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
