import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Action, ActionsSubject, Store } from '@ngrx/store';
import { AppState } from '../../app-store/state/app.reducers';
import { StudentsHelper } from '../../students/students.helper';
import { selectStudents } from '../../app-store/student-state/students.selectors';
import { selectSelectedClass } from '../../app-store/classes-state/classes.selectors';
import {
    ActionTypes,
    AddGrading,
    GetAllStudents,
    RemoveGrading,
} from '../../app-store/student-state/students.actions';
import {
    GetAllClasses,
    ViewClass,
} from '../../app-store/classes-state/classes.actions';
import { ClassesHelper } from '../../classes/classes.helper';
import { ClassModel } from '../../common/models/class';
import * as moment from 'moment';
import { AlertController } from '@ionic/angular';
import { StudentModel } from '../../common/models/student';
import * as _ from 'underscore';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-add-grading',
    templateUrl: './add-grading.component.html',
    styleUrls: ['./add-grading.component.scss'],
})
export class AddGradingComponent implements OnInit, OnDestroy {
    @Input()
    aclassId: string;

    aclass: ClassModel;
    students: StudentModel[];

    subsc;
    subsc2;

    gradings: Array<{
        beforeGrading: number;
        afterGrading: number;
        hbId: string;
        name: {
            firstname: string;
            lastname: string;
        };
        didGrade: boolean;
    }>;

    studentsWhoAreLoading: string[] = [];

    constructor(
        public studentHelper: StudentsHelper,
        public store: Store<AppState>,
        public activatedRoute: ActivatedRoute,
        public alertController: AlertController,
        public actionsSubject: ActionsSubject
    ) {}

    ngOnInit() {
        this.store.dispatch(new GetAllStudents());
        this.store.dispatch(new GetAllClasses());

        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.aclassId = params.get('classId');
            this.store.select(selectSelectedClass(this.aclassId));
        });

        this.subsc2 = this.actionsSubject.subscribe((data: Action) => {
            if (
                data.type === ActionTypes.Add_grading_success ||
                data.type === ActionTypes.Remove_grading_success
            ) {
                this.studentsWhoAreLoading = this.studentsWhoAreLoading.filter(
                    student => student !== data['payload'].hbId
                );
            }
        });

        this.subsc = combineLatest([
            this.store.select(selectStudents),
            this.store.select(selectSelectedClass(this.aclassId)),
        ])
            .pipe(
                map(([students, aclass]) => ({
                    students,
                    aclass,
                }))
            )
            .subscribe(({ students, aclass }) => {
                this.students = students;
                this.aclass = aclass;
                if (aclass === null || aclass === undefined) {
                    return;
                }

                const attendedStudent = this.studentHelper.getStudentsByIds(
                    aclass.attendance,
                    students
                );

                this.gradings = this.studentHelper.getGradingInformationForStudentsWithNoneGradedStudents(
                    attendedStudent,
                    aclass.date
                );
            });
    }

    isStudentLoading(hbid) {
        return this.studentsWhoAreLoading.some(s => {
            return s === hbid;
        });
    }

    none(student, slideItem) {
        this.studentsWhoAreLoading.push(student.hbId);
        slideItem.close();

        const gradedStudent = this.studentHelper.getStudentsById(
            student.hbId,
            this.students
        );

        const todaysGrades = gradedStudent.gradingDates.filter(grade => {
            return moment(grade.date).isSame(this.aclass.date);
        });

        const maxToday = _.max(todaysGrades, todaysGrade => {
            return todaysGrade.grade;
        });

        const higherGrade = gradedStudent.gradingDates.find(gradingDate => {
            return gradingDate.grade > maxToday.grade;
        });

        if (higherGrade) {
            this.presentConfirm(student, todaysGrades);
        } else {
            this.removeGrading(gradedStudent, todaysGrades);
        }
    }

    single(student, slideItem) {
        this.studentsWhoAreLoading.push(student.hbId);

        slideItem.close();

        const gradedStudent = this.studentHelper.getStudentsById(
            student.hbId,
            this.students
        );

        const gradeAlreadyExists = this.studentHelper.checkIfGradeAlreadyExists(
            gradedStudent,
            1,
            this.aclass.date
        );

        const grading = {
            date: this.aclass.date,
            grade:
                this.studentHelper.gradeBeforeGrading(
                    gradedStudent,
                    this.aclass.date
                ) + 1,
        };

        this.store.dispatch(
            new AddGrading({ student: gradedStudent, grading: [grading] })
        );
    }

    double(student, slideItem) {
        this.studentsWhoAreLoading.push(student.hbId);

        slideItem.close();

        const gradedStudent = this.studentHelper.getStudentsById(
            student.hbId,
            this.students
        );

        const gradesToAdd = [];

        const firstGradeAlreadyExists = this.studentHelper.checkIfGradeAlreadyExists(
            gradedStudent,
            1,
            this.aclass.date
        );

        if (!firstGradeAlreadyExists) {
            const grading = {
                date: this.aclass.date,
                grade:
                    this.studentHelper.gradeBeforeGrading(
                        gradedStudent,
                        this.aclass.date
                    ) + 1,
            };

            gradesToAdd.push(grading);
        }

        const secondGradeAlreadyExists = this.studentHelper.checkIfGradeAlreadyExists(
            gradedStudent,
            2,
            this.aclass.date
        );

        if (!secondGradeAlreadyExists) {
            const grading2 = {
                date: this.aclass.date,
                grade:
                    this.studentHelper.gradeBeforeGrading(
                        gradedStudent,
                        this.aclass.date
                    ) + 2,
            };

            gradesToAdd.push(grading2);
        }

        if (gradesToAdd.length > 0) {
            this.store.dispatch(
                new AddGrading({ student: gradedStudent, grading: gradesToAdd })
            );
        }
    }

    removeGrading(student, todaysGrades) {
        this.store.dispatch(
            new RemoveGrading({ student: student, grading: todaysGrades })
        );
    }

    async presentConfirm(student, todaysGrades) {
        const alert = await this.alertController.create({
            header: 'Are you sure?',
            message: 'This student has future gradings',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: blah => {
                        console.log('Confirm Cancel: blah');
                    },
                },
                {
                    text: 'Okay',
                    handler: () => {
                        this.removeGrading(student, todaysGrades);
                    },
                },
            ],
        });
        await alert.present();
    }

    ngOnDestroy(): void {
        this.subsc.unsubscribe();
        this.subsc2.unsubscribe();
    }
}
