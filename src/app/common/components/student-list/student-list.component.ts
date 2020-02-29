import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    OnDestroy,
} from '@angular/core';
import { ActionsSubject, ReducerManagerDispatcher, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppState } from '../../../state/app.reducers';
import {
    ActionTypes,
    ActivateStudent,
    DeactivateStudent,
    GetAllStudents,
} from '../../../students/state/students.actions';
import { StudentModel } from '../../models/student';
import {
    selectActiveStudents,
    selectInactiveStudents,
} from '../../../students/state/students.selectors';
import { selectSelectedStudentsLastClass } from '../../../students/state/students.selectors';
import { Validators } from '@angular/forms';
import { emptyValidator } from '../../validators/empty.validator';

@Component({
    selector: 'app-student-list',
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnChanges, OnInit, OnDestroy {
    students: Observable<StudentModel[]> = of([]);
    filteredStudents: Observable<StudentModel[]> = of([]);

    selectSelectedStudentsLastClass = selectSelectedStudentsLastClass;

    subsc;

    @Input()
    listType: string;

    @Input()
    search = '';

    @Input()
    shouldShowWarning = false;

    @Output()
    studentClickEvent: EventEmitter<string> = new EventEmitter<string>();

    constructor(
        public store: Store<AppState>,
        private actionsSubject: ActionsSubject
    ) {}

    ngOnInit() {
        this.store.dispatch(new GetAllStudents());

        this.subsc = this.actionsSubject.subscribe(data => {
            console.log(data.type);
            if (
                data.type === ActionTypes.Deactivate_student_success ||
                data.type === ActionTypes.Activate_student_success ||
                data.type === ActionTypes.Get_all_students_success
            ) {
                this.students =
                    this.listType === 'active'
                        ? this.store.select(selectActiveStudents)
                        : this.store.select(selectInactiveStudents);

                this.filteredStudents = this.students;
            }
        });
    }

    ngOnChanges() {
        this.filteredStudents = this.students.pipe(
            map(students =>
                students.filter(student => {
                    return (
                        student.name.firstname
                            .toLocaleLowerCase()
                            .includes(this.search.toLocaleLowerCase()) ||
                        student.name.lastname
                            .toLocaleLowerCase()
                            .includes(this.search.toLocaleLowerCase())
                    );
                })
            )
        );
    }

    selectStudent(student: StudentModel, index: number) {
        this.studentClickEvent.emit(student.hbId);
    }

    deactivate(studentID, index, slide) {
        this.store.dispatch(new DeactivateStudent(studentID));
        slide.close();
    }

    activate(studentID, index, slide) {
        this.store.dispatch(new ActivateStudent(studentID));
        slide.close();
    }

    ngOnDestroy() {
        this.subsc.unsubscribe();
        this.studentClickEvent.unsubscribe();
    }
}
