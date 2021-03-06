// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import {
//     async,
//     ComponentFixture,
//     fakeAsync,
//     TestBed,
//     tick,
// } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Store } from '@ngrx/app-store';
// import { MockStore, provideMockStore } from '@ngrx/app-store/testing';
// import { createClassWithAll } from '../../../../testing-helpers/class-test-helper';
// import { MockPopOverController } from '../../../../testing-helpers/ionic.mocks';
// import {
//     createStudent,
//     createStudentAll,
// } from '../../../../testing-helpers/student-test-helper';
// import { MissedClassWarningComponent } from './missed-class-warning.component';
// import * as moment from 'moment-timezone';

// describe('MissedClassWarningComponent', () => {
//     let component: MissedClassWarningComponent;
//     let fixture: ComponentFixture<MissedClassWarningComponent>;
//     let router: Router;

//     let app-store: MockStore<{
//         authentication: {
//             authenticationState: string;
//         };
//     }>;

//     const initialState = {
//         students: {
//             students: [
//                 createStudentAll(null, null, null, null, 1, null, false),
//                 createStudent(),
//                 createStudent(),
//             ],
//         },
//         classes: {
//             classes: [
//                 createClassWithAll(
//                     null,
//                     null,
//                     ['hb088'],
//                     null,
//                     moment(new Date('01/02/18').toISOString()),
//                     null
//                 ),
//                 createClassWithAll(
//                     null,
//                     null,
//                     ['hb089'],
//                     null,
//                     moment().subtract('1', 'day'),
//                     null
//                 ),
//             ],
//         },
//     };

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [MissedClassWarningComponent],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA],
//             imports: [RouterTestingModule.withRoutes([])],
//             providers: [provideMockStore({ initialState })],
//         }).compileComponents();
//         fixture = TestBed.createComponent(MissedClassWarningComponent);
//         component = fixture.componentInstance;
//         component.student = createStudentAll(null, null, 'hb088');
//         app-store = TestBed.inject(Store);
//         router = TestBed.inject(Router);
//         spyOn(app-store, 'dispatch').and.callThrough();
//         fixture.detectChanges();
//     }));

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });

//     it('should set show warning to true if class date greater 60 days', fakeAsync(() => {
//         component.student = createStudentAll(null, null, 'hb088');
//         component.ngOnInit();
//         expect(component.shouldShowWarning).toBeTruthy();
//     }));

//     it('should set show warning to false if class date less 60 days', fakeAsync(() => {
//       component.student = createStudentAll(null, null, 'hb089');
//       component.ngOnInit();
//       expect(component.shouldShowWarning).toBeFalsy();
//     }));
// });
