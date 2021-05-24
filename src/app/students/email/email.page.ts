import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import { emptyValidator } from '../../common/validators/empty.validator';
import * as moment from 'moment';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { selectSelectedStudent } from '../../app-store/student-state/students.selectors';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-store/state/app.reducers';
import { StudentModel } from '../../common/models/student';
import {
    EditEmail,
    EditStudent,
    GetAllStudents,
} from '../../app-store/student-state/students.actions';
import { GetAllClasses } from '../../app-store/classes-state/classes.actions';
import { NavController } from '@ionic/angular';
import { MessagesService } from '../../common/messages/messages.service';

@Component({
    selector: 'app-email',
    templateUrl: './email.page.html',
    styleUrls: ['./email.page.scss'],
})
export class EmailPage implements OnInit {
    emailForm: FormGroup;
    saveAttempted = false;
    studentId;
    studentOb;
    studentObservable;
    student;

    validation_messages = {
        email: [
            { type: 'required', message: 'Email is required' },
            {
                type: 'maxlength',
                message: 'Email must be 100 characters or less',
            },
            { type: 'empty', message: 'Email is required' },
        ],
    };

    constructor(
        private fb: FormBuilder,
        public activatedRoute: ActivatedRoute,
        public store: Store<AppState>,
        public navController: NavController,
        private messages: MessagesService,
        private router: Router
    ) {}

    ngOnInit() {
        this.store.dispatch(new GetAllStudents());

        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.studentId = params.get('studentId');
            this.studentOb = this.store.select(
                selectSelectedStudent(this.studentId)
            );

            this.studentObservable = this.studentOb.subscribe(
                (student: StudentModel) => {
                    this.student = student;

                    if (this.student === null) {
                        return;
                    }

                    this.emailForm = this.fb.group({
                        email: [
                            this.student.email,
                            [
                                Validators.email,
                                Validators.maxLength(100),
                                emptyValidator(),
                            ],
                        ],
                    });
                }
            );
        });
    }

    save() {
        this.saveAttempted = true;
        if (this.emailForm.invalid) {
            this.messages.updateError.next(
                'Looks like you have tried to submit an invalid form. Update the form and try again.'
            );
        } else {
            const saveValues = this.emailForm.value;
            this.store.dispatch(
                new EditEmail({
                    email: saveValues.email,
                    hbId: this.student.hbId,
                })
            );
            this.router.navigate(['student/view/' + this.studentId]);
        }
    }

    cancel() {
        this.navController.navigateBack('student/view/' + this.studentId);
    }
}
