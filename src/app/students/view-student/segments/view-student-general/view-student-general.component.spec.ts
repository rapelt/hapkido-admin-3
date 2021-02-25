import {
    async,
    fakeAsync,
    TestBed,
    tick,
    waitForAsync,
} from '@angular/core/testing';
import { ViewStudentGeneralComponent } from './view-student-general.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngrx/store';
import {
    emptyInitialState,
    popululdatedInitialState,
} from '../../../../../testing-helpers/test-state-helpter';
import { delay } from 'rxjs/operators';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ViewStudentPageGeneral', () => {
    let fixture;
    let component;
    let store;
    let http;

    const initialState = {
        ...popululdatedInitialState(),
    };

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [ViewStudentGeneralComponent],
                schemas: [CUSTOM_ELEMENTS_SCHEMA],
                imports: [
                    CommonModule,
                    RouterTestingModule.withRoutes([]),
                    HttpClientTestingModule,
                ],
                providers: [provideMockStore({ initialState })],
            }).compileComponents();

            fixture = TestBed.createComponent(ViewStudentGeneralComponent);
            component = fixture.componentInstance;
            store = TestBed.inject(Store);
            http = TestBed.inject(HttpClientTestingModule);
            spyOn(store, 'dispatch').and.callThrough();
            spyOn(http, 'post').and.returnValue(true);

            fixture.detectChanges();
        })
    );
});
