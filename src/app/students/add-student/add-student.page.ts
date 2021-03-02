import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { GradeHelper } from '../../common/helper/grade/grade';
import { GradeModel } from '../../common/helper/grade/grade.model';
import { classType, ClassTypes } from '../../common/models/class-types';
import { FamilyModel } from '../../common/models/family.model';
import { paymentType, PaymentTypes } from '../../common/models/payment-types';
import { StudentModel } from '../../common/models/student';
import { CapitialisePipe } from '../../common/pipes/capitialise.pipe';
import { emptyValidator } from '../../common/validators/empty.validator';
import { MessagesService } from '../../common/messages/messages.service';
import { AppState } from '../../app-store/state/app.reducers';
import {
    AddNewStudent,
    GetAllFamilies,
} from '../../app-store/student-state/students.actions';
import { selectFamilies } from '../../app-store/student-state/students.selectors';

@Component({
    selector: 'app-add-student',
    templateUrl: './add-student.page.html',
    styleUrls: ['./add-student.page.scss'],
})
export class AddStudentPage implements OnInit {
    validation_messages = {
        firstname: [
            { type: 'required', message: 'First name is required' },
            {
                type: 'maxlength',
                message: 'First name cannot be more than 100 characters long',
            },
            { type: 'empty', message: 'First name is required' },
        ],
        lastname: [
            { type: 'required', message: 'Last name is required' },
            {
                type: 'maxlength',
                message: 'Last name cannot be more than 100 characters long',
            },
            { type: 'empty', message: 'Last name is required' },
        ],
        hbid: [
            { type: 'required', message: 'HB ID is required' },
            {
                type: 'maxlength',
                message: 'HB ID must be 6 characters or less',
            },
            { type: 'empty', message: 'HB ID is required' },
        ],
        // email: [
        //     { type: 'required', message: 'Email is required' },
        //     {
        //         type: 'maxlength',
        //         message: 'Email must be 100 characters or less',
        //     },
        //     { type: 'empty', message: 'Email is required' },
        // ],
        joiningDate: [
            { type: 'required', message: 'Joining date is required' },
        ],
        grade: [{ type: 'required', message: 'Grade is required' }],
        preferredClass: [
            { type: 'required', message: 'Preferred class is required' },
        ],
    };

    newStudentForm: FormGroup;
    grades: GradeModel[] = [];
    classTypes: classType[] = [];
    paymentTypes: paymentType[] = [];
    families: Observable<FamilyModel[]>;

    saveAttempted = false;

    constructor(
        private fb: FormBuilder,
        private gradeHelper: GradeHelper,
        private store: Store<AppState>,
        public navController: NavController,
        private messages: MessagesService,
        private capitalise: CapitialisePipe
    ) {}

    ngOnInit() {
        this.store.dispatch(new GetAllFamilies());

        this.newStudentForm = this.fb.group({
            hbId: ['', [Validators.maxLength(6), emptyValidator()]],
            firstname: ['', [Validators.maxLength(100), emptyValidator()]],
            lastname: ['', [Validators.maxLength(100), emptyValidator()]],
            // email: [
            //     '',
            //     [Validators.email, Validators.maxLength(100), emptyValidator()],
            // ],
            joiningDate: [moment().format('YYYY-MM-DD'), [Validators.required]],
            grade: ['', [Validators.required]],
            preferredClass: ['', [Validators.required]],
            family: [],
            // paymentType: [],
        });

        this.families = this.store.select(selectFamilies);

        this.grades = this.gradeHelper.getAllGrades();
        this.classTypes = [ClassTypes.Adults, ClassTypes.Family];
        this.paymentTypes = [
            PaymentTypes.TenSession,
            PaymentTypes.Monthly,
            PaymentTypes.ThreeMonthly,
        ];
    }

    save() {
        this.saveAttempted = true;
        if (this.newStudentForm.invalid) {
            this.messages.updateError.next(
                'Looks like you have tried to submit an invalid form. Update the form and try again.'
            );
        } else {
            const saveValues = this.newStudentForm.value;
            const student: StudentModel = {
                name: {
                    firstname: this.capitalise.transform(
                        saveValues.firstname.trim()
                    ), // TODO unit test capitalisation
                    lastname: this.capitalise.transform(
                        saveValues.lastname.trim()
                    ), // TODO unit test capitalisation
                },
                hbId: saveValues.hbId.trim(),
                email: null,
                grade: saveValues.grade.id,
                isAdmin: false,
                isActive: true,
                preferredClass: saveValues.preferredClass,
                familyId: saveValues.family
                    ? saveValues.family.family_id
                    : null,
                paymentType: null,
                gradingDates: [
                    {
                        date: moment(saveValues.joiningDate),
                        grade: saveValues.grade.id,
                    },
                ],
                hasAppAccess: false,
                hasAppLogin: false,
            };

            this.store.dispatch(new AddNewStudent(student));
            this.navController.navigateBack('/student/list/active');
        }
    }

    cancel() {
        this.navController.navigateBack('/student/list/active');
    }
}
