import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { createStudent, createStudentAll } from '../../../../testing-helpers/student-test-helper';
import { AuthenticationStates } from '../../../authentication/authentication-states';
import { CommonComponentsModule } from '../../common-components.module';
import { GradeHelper } from '../../helper/grade/grade';
import { AlphabeticalStudentsPipe } from '../../pipes/alphabeticalstudents/alphabeticalstudents';
import { CapitialisePipe } from '../../pipes/capitialise.pipe';
import { GradeBadgeComponent } from '../grade-badge/grade-badge.component';

import { StudentListComponent } from './student-list.component';

describe('StudentListComponent', () => {
  let component: StudentListComponent;
  let fixture: ComponentFixture<StudentListComponent>;

  let store: MockStore<{ authentication: {
      authenticationState: string,
    }
  }>;

  const initialState = {
    students: {
      students: [
        createStudentAll(null, null, null, null, 1, null, false),
        createStudent(),
        createStudent()
      ]
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StudentListComponent,
        AlphabeticalStudentsPipe,
        CapitialisePipe,
        GradeBadgeComponent ],
      providers: [
        provideMockStore({ initialState }),
        GradeHelper
      ],
      imports: [
        IonicModule.forRoot(),
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentListComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create students list with active students', ((done) => {
    component.listType = 'active';
    component.ngOnInit();

    component.students.subscribe((students) => {
      expect(students.length).toEqual(2);
      done();
    });
  }));


  it('should create students list with inactive students', ((done) => {
    component.listType = 'inactive';
    component.ngOnInit();

    component.students.subscribe((students) => {
      expect(students.length).toEqual(1);
      done();
    });
  }));
});
