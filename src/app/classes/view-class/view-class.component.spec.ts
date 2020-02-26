import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewClassComponent } from './view-class.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthLibModule } from 'hapkido-auth-lib';
import { config } from '../../../environments/environment.test';
import { CommonComponentsModule } from '../../common/common-components.module';
import { provideMockStore } from '@ngrx/store/testing';
import { AuthenticationStates } from '../../authentication/authentication-states';

describe('ViewClassComponent', () => {
    let component: ViewClassComponent;
    let fixture: ComponentFixture<ViewClassComponent>;

    const initialState = {
        authentication: {
            user: null,
            authenticationState: AuthenticationStates.LOGGEDOUT,
            userAttributes: [],
            username: null,
            session: null,
        },
        classes: {
            classes: [],
            selectedClass: null,
        },
        Students: {},
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ViewClassComponent],
            providers: [provideMockStore({ initialState })],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule.withRoutes([]),
                AuthLibModule.forRoot(config),
                CommonComponentsModule,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ViewClassComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
