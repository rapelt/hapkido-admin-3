// import { CommonModule } from '@angular/common';
// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Store } from '@ngrx/store';
// import { MockStore, provideMockStore } from '@ngrx/store/testing';
// import { createClass } from '../../../testing-helpers/class-test-helper';
// import { createFamilyWithAll } from '../../../testing-helpers/family-test-helper';
// import {
//     createStudent,
//     createStudentAll,
// } from '../../../testing-helpers/student-test-helper';
// import { CapitialisePipe } from '../../common/pipes/capitialise.pipe';
// import { ViewStudentPage } from './view-student.page';

// describe('ViewStudentPage', () => {
//     let component: ViewStudentPage;
//     let fixture: ComponentFixture<ViewStudentPage>;
//     let router: Router;

//     let store: MockStore<{
//         authentication: {
//             authenticationState: string;
//         };
//     }>;

//     const initialState = {
//         students: {
//             students: [
//                 createStudentAll(
//                     null,
//                     null,
//                     null,
//                     null,
//                     1,
//                     null,
//                     false,
//                     null,
//                     null,
//                     1
//                 ),
//                 createStudent(),
//                 createStudent(),
//             ],
//             families: [createFamilyWithAll(1)],
//         },
//         classes: {
//             classes: [createClass()],
//         },
//     };

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [ViewStudentPage, CapitialisePipe],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA],
//             imports: [CommonModule, RouterTestingModule.withRoutes([])],
//             providers: [provideMockStore({ initialState })],
//         }).compileComponents();

//         fixture = TestBed.createComponent(ViewStudentPage);
//         component = fixture.componentInstance;
//         store = TestBed.get(Store);
//         router = TestBed.get(Router);
//         spyOn(store, 'dispatch').and.callThrough();
//         fixture.detectChanges();
//     }));

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
// });
