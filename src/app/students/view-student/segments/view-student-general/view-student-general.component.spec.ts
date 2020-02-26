// import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { RouterTestingModule } from '@angular/router/testing';
// import { Store } from '@ngrx/store';
// import { MockStore, provideMockStore } from '@ngrx/store/testing';
// import { createClass } from '../../../../../testing-helpers/class-test-helper';
// import { createFamilyWithAll } from '../../../../../testing-helpers/family-test-helper';
// import { createStudent, createStudentAll } from '../../../../../testing-helpers/student-test-helper';
// import { CommonComponentsModule } from '../../../../common/common-components.module';
// import { ViewStudentGeneralComponent } from './view-student-general.component';
//
// describe('ViewStudentPageGeneral', () => {
//   let component: ViewStudentGeneralComponent;
//   let fixture: ComponentFixture<ViewStudentGeneralComponent>;
//   let router: Router;
//
//   let store: MockStore<{ authentication: {
//       authenticationState: string,
//     }
//   }>;
//
//   const initialState = {
//     students: {
//       students: [
//         createStudentAll(null, null, null, null, 1, null, false),
//         createStudent(),
//         createStudent()
//       ],
//       families: [
//         createFamilyWithAll()
//       ]
//     },
//     classes: {
//       classes: [
//         createClass()
//       ]
//     }
//   };
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [ ViewStudentGeneralComponent ],
//       schemas: [CUSTOM_ELEMENTS_SCHEMA],
//       imports: [
//         CommonComponentsModule,
//         RouterTestingModule.withRoutes([])
//       ],
//       providers: [
//         provideMockStore({ initialState })
//       ]
//     })
//       .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(ViewStudentGeneralComponent);
//     component = fixture.componentInstance;
//     store = TestBed.get(Store);
//     router = TestBed.get(Router);
//     spyOn(store, 'dispatch').and.callThrough();
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
