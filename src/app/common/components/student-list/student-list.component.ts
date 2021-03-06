import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    OnDestroy,
} from '@angular/core';
import {
    ActionsSubject,
    ReducerManagerDispatcher,
    select,
    Store,
} from '@ngrx/store';
import { combineLatest, Observable, of } from 'rxjs';
import {
    debounceTime,
    distinctUntilChanged,
    filter,
    map,
    takeWhile,
} from 'rxjs/operators';
import { AppState } from '../../../app-store/state/app.reducers';
import {
    ActionTypes,
    ActivateStudent,
    DeactivateStudent,
    GetAllStudents,
} from '../../../app-store/student-state/students.actions';
import { StudentModel } from '../../models/student';
import {
    selectActiveStudents,
    selectInactiveStudents,
} from '../../../app-store/student-state/students.selectors';
import { selectSelectedStudentsLastClass } from '../../../app-store/student-state/students.selectors';
import { Validators } from '@angular/forms';
import { emptyValidator } from '../../validators/empty.validator';

@Component({
    selector: 'app-student-list',
    templateUrl: './student-list.component.html',
    styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnChanges, OnInit, OnDestroy {
    filteredStudents: Observable<StudentModel[]> = of([]);

    selectSelectedStudentsLastClass = selectSelectedStudentsLastClass;

    subsc;

    @Input()
    listType: string;

    @Input()
    search = '';

    @Input()
    shouldShowWarning = false;

    @Input()
    students: Observable<StudentModel[]> = of([]);

    @Output()
    studentClickEvent: EventEmitter<string> = new EventEmitter<string>();

    loading = true;

    constructor(
        public store: Store<AppState>,
        private actionsSubject: ActionsSubject
    ) {}

    ngOnInit() {
        this.subsc = this.actionsSubject.subscribe(data => {
            if (
                data.type === ActionTypes.Deactivate_student_success ||
                data.type === ActionTypes.Activate_student_success ||
                data.type === ActionTypes.Get_all_students_success
            ) {
                this.setStudents();
            }
        });

        this.setStudents();
    }

    setStudents() {
        this.students =
            this.listType === 'active'
                ? this.store.select(selectActiveStudents)
                : this.store.select(selectInactiveStudents);

        this.filteredStudents = this.students;

        this.loading = false;
    }

    ngOnChanges() {
        if (this.students === undefined) {
            return;
        }
        this.filteredStudents = this.students.pipe(
            debounceTime(200),
            distinctUntilChanged(),
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
