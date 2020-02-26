import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassesPage } from './classes.page';
import { ViewClassComponent } from './view-class/view-class.component';
import { provideMockStore } from '@ngrx/store/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthLibModule } from 'hapkido-auth-lib';
import { config } from '../../environments/environment.test';
import { CommonComponentsModule } from '../common/common-components.module';
import { AuthenticationStates } from '../authentication/authentication-states';

describe('ClassesPage', () => {
    let component: ClassesPage;
    let fixture: ComponentFixture<ClassesPage>;

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
            declarations: [ClassesPage],
            providers: [provideMockStore({ initialState })],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule.withRoutes([]),
                AuthLibModule.forRoot(config),
                CommonComponentsModule,
            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClassesPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
