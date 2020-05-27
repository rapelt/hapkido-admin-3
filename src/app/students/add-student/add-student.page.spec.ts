import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
    async,
    ComponentFixture,
    TestBed,
    fakeAsync,
} from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CommonComponentsModule } from '../../common/common-components.module';
import { CapitialisePipe } from '../../common/pipes/capitialise.pipe';
import { MessagesModule } from '../../messages/messages.module';
import { MessagesService } from '../../messages/messages.service';

import { AddStudentPage } from './add-student.page';
import { AuthenticationGuard, AuthLibModule } from 'hapkido-auth-lib';
import { config } from '../../../environments/environment';
import { routes } from '../students-routing.module';

describe('AddStudentPage', () => {
    let component: AddStudentPage;
    let fixture: ComponentFixture<AddStudentPage>;
    let router: Router;
    let messageService: MessagesService;

    let store;

    const initialState = {
        students: {
            students: [],
            selectedStudent: null,
            families: [],
        },
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AddStudentPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                MessagesModule,
                BrowserModule,
                CommonComponentsModule,
                IonicModule,
                AuthLibModule.forRoot(config),
                RouterTestingModule.withRoutes(routes),
            ],
            providers: [provideMockStore({ initialState }), CapitialisePipe],
        }).compileComponents();

        fixture = TestBed.createComponent(AddStudentPage);
        component = fixture.componentInstance;
        store = TestBed.inject(Store);
        router = TestBed.inject(Router);
        messageService = TestBed.inject(MessagesService);
        spyOn(store, 'dispatch').and.callThrough();
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should redirect back to student list when cancel clicked', fakeAsync(() => {
        const navigateSpy = spyOn(router, 'navigateByUrl');

        component.cancel();

        expect(navigateSpy).toHaveBeenCalled();
    }));

    it('should display error message when form invalid', () => {
        spyOn(messageService.updateError, 'next').and.callThrough();

        component.save();

        expect(messageService.updateError.next).toHaveBeenCalledWith(
            'Looks like you have tried to submit an invalid form. Update the form and try again.'
        );
    });
});
