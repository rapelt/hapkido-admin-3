import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppState } from '../../../state/app.reducers';
import { StudentModel } from '../../../students/models/student';
import { selectActiveStudents, selectInactiveStudents } from '../../../students/state/students.selectors';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit, OnChanges {

  students: Observable<Array<StudentModel>> = of([]);
  filteredStudents: Observable<Array<StudentModel>> = of([]);

  @Input()
  listType: string;

  @Input()
  search = '';

  constructor(
    public store: Store<AppState>
  ) { }

  ngOnInit() {
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
        console.log(student);
        return student.name.firstname.toLocaleLowerCase().includes(this.search.toLocaleLowerCase()) ||
          student.name.lastname.toLocaleLowerCase().includes(this.search.toLocaleLowerCase());
      }))
    );
  }

  selectStudent(student, i) {

  }

}
