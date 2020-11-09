// import { CommonModule } from '@angular/common';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Store } from '@ngrx/app-store';
// import { MockStore, provideMockStore } from '@ngrx/app-store/testing';
// import {
//     createStudent,
//     createStudentAll,
// } from '../../../../../testing-helpers/student-test-helper';
// import { CommonComponentsModule } from '../../../../common/common-components.module';
// import { ViewStudentPaymentsComponent } from './view-student-payments.component';
// import { createFamilyWithAll } from '../../../../../testing-helpers/family-test-helper';
//
// describe('ViewStudentPagePayments', () => {
//     let component: ViewStudentPaymentsComponent;
//     let fixture: ComponentFixture<ViewStudentPaymentsComponent>;
//     let router: Router;
//
//     let app-store: MockStore<{
//         authentication: {
//             authenticationState: string;
//         };
//     }>;
//
//     const initialState = {
//         students: {
//             students: [
//                 createStudentAll(null, null, 'hb001', null, 1, null, false),
//                 createStudent(),
//                 createStudent(),
//             ],
//             families: [createFamilyWithAll()],
//             selectedStudent: null,
//         },
//     };
//
//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [ViewStudentPaymentsComponent],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA],
//             imports: [
//                 CommonComponentsModule,
//                 RouterTestingModule.withRoutes([]),
//             ],
//             providers: [provideMockStore({ initialState })],
//         }).compileComponents();
//
//         fixture = TestBed.createComponent(ViewStudentPaymentsComponent);
//         component = fixture.componentInstance;
//         app-store = TestBed.inject(Store);
//         router = TestBed.inject(Router);
//         spyOn(app-store, 'dispatch').and.callThrough();
//         fixture.detectChanges();
//     }));
//
//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
// });
