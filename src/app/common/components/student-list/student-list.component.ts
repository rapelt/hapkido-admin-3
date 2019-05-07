import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppState } from '../../../state/app.reducers';
import { GetAllStudents } from '../../../students/state/students.actions';
import { StudentModel } from '../../models/student';
import { selectActiveStudents, selectInactiveStudents } from '../../../students/state/students.selectors';
import {
  selectSelectedStudentsLastClass
} from '../../../students/state/students.selectors';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnChanges, OnInit {

  students: Observable<Array<StudentModel>> = of([]);
  filteredStudents: Observable<Array<StudentModel>> = of([]);

  selectSelectedStudentsLastClass = selectSelectedStudentsLastClass;

  @Input()
  listType: string;

  @Input()
  search = '';

  @Input()
  shouldShowWarning = false;

  @Output()
  studentClickEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor(
    public store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.store.dispatch(new GetAllStudents());

    if (this.listType === 'active') {
      this.students = this.store.select(selectActiveStudents);
    } else {
      this.students = this.store.select(selectInactiveStudents);
    }

    this.filteredStudents = this.students;
  }

  ngOnChanges() {
    this.filteredStudents = this.students.pipe(
      map(students => students.filter(student => {
        return student.name.firstname.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()) ||
          student.name.lastname.toLocaleLowerCase().includes(this.search.toLocaleLowerCase());
      }))
    );
  }

  selectStudent(student: StudentModel) {
    this.studentClickEvent.emit(student.hbId);
  }

}
