// import {
//     async,
//     ComponentFixture,
//     fakeAsync,
//     TestBed,
//     tick,
// } from '@angular/core/testing';
// import { IonicModule } from '@ionic/angular';
// import { Store } from '@ngrx/app-store';
// import { MockStore, provideMockStore } from '@ngrx/app-store/testing';
// import {
//     createStudent,
//     createStudentAll,
// } from '../../../../testing-helpers/student-test-helper';
// import { AuthenticationStates } from '../../../authentication/authentication-states';
// import { CommonComponentsModule } from '../../common-components.module';
// import { GradeHelper } from '../../helper/grade/grade';
// import { AlphabeticalStudentsPipe } from '../../pipes/alphabeticalstudents/alphabeticalstudents';
// import { CapitialisePipe } from '../../pipes/capitialise.pipe';
// import { GradeBadgeComponent } from '../grade-badge/grade-badge.component';

// import { StudentListComponent } from './student-list.component';
// import { MissedClassWarningComponent } from '../missed-class-warning/missed-class-warning.component';

// fdescribe('StudentListComponent', () => {
//     let component: StudentListComponent;
//     let fixture: ComponentFixture<StudentListComponent>;

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
//     };

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [
//                 StudentListComponent,
//                 AlphabeticalStudentsPipe,
//                 CapitialisePipe,
//                 MissedClassWarningComponent,
//                 GradeBadgeComponent,
//             ],
//             providers: [provideMockStore({ initialState }), GradeHelper],
//             imports: [IonicModule],
//         }).compileComponents();

//         fixture = TestBed.createComponent(StudentListComponent);
//         component = fixture.componentInstance;
//         app-store = TestBed.inject(Store);
//         spyOn(app-store, 'dispatch').and.callThrough();
//         fixture.detectChanges();
//     }));

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });

//     it('should create students list with active students', done => {
//         component.listType = 'active';
//         component.ngOnInit();

//
//         component.students.subscribe(students => {
//

//             expect(students.length).toEqual(2);
//             done();
//         });
//     });

//     it('should create students list with inactive students', done => {
//         component.listType = 'inactive';
//         component.ngOnInit();

//         component.students.subscribe(students => {
//             expect(students.length).toEqual(1);
//             done();
//         });
//     });
// });
