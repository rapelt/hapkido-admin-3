import { Component, OnInit } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Moment } from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import * as moment from 'moment';
import { map } from 'rxjs/operators';
import { ClassModel } from '../../common/models/class';
import { ClassTypes } from '../../common/models/class-types';
import { emptyValidator } from '../../common/validators/empty.validator';
import { AppState } from '../../state/app.reducers';
import { ClassesHelper } from '../classes.helper';
import { getClasses } from '../state/classes.selectors';
import { AddClasses } from '../state/classes.actions';
import { MessagesService } from '../../messages/messages.service';

@Component({
    selector: 'app-add-class',
    templateUrl: './add-class.component.html',
    styleUrls: ['./add-class.component.scss'],
})
export class AddClassComponent implements OnInit {
    classForm: FormGroup;
    selectedDates: Date[] = [];
    preselectedDates: Moment[] = [];
    classes: ClassModel[] = [];

    classTypes = [
        ClassTypes.Adults,
        ClassTypes.Family,
        ClassTypes.Kumdo,
        ClassTypes.Advanced,
        ClassTypes.Other,
    ];
    saveAttempted = false;

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
        email: [
            { type: 'required', message: 'Email is required' },
            {
                type: 'maxlength',
                message: 'Email must be 100 characters or less',
            },
            { type: 'empty', message: 'Email is required' },
        ],
        joiningDate: [
            { type: 'required', message: 'Joining date is required' },
        ],
        grade: [{ type: 'required', message: 'Grade is required' }],
        preferredClass: [
            { type: 'required', message: 'Preferred class is required' },
        ],
    };

    constructor(
        private fb: FormBuilder,
        public route: ActivatedRoute,
        public router: Router,
        public store: Store<AppState>,
        public classHelper: ClassesHelper,
        public messagesService: MessagesService
    ) {}

    ngOnInit() {
        this.store.select(getClasses).subscribe(classes => {
            this.preselectedDates = this.classHelper.getAllDates(classes);
        });

        this.initaliseForm();
    }

    cancel() {
        this.router.navigateByUrl('/class');
    }

    save() {
        const newClasses: ClassModel[] = [];

        if (this.selectedDates.length === 0) {
            this.messagesService.updateError.next(
                'Please select one or more dates on the calendar'
            );
        }

        this.selectedDates.forEach(ncdate => {
            (this.classForm.controls.classes as FormArray).controls.forEach(
                newClass => {
                    const nc = newClass['controls'] as FormControl;
                    const classType: string = nc['classType'].value;
                    const attendance: string[] = [];
                    const isGrading: boolean = nc['isGrading'].value;
                    const time: any = nc['startTime'].value.split(':');
                    const date: Moment = moment(ncdate);
                    const classId = '0';
                    date.set({ hour: time[0], minute: time[1] });
                    const startTime: string = nc['startTime'].value;
                    newClasses.push({
                        classId,
                        classType,
                        attendance,
                        isGrading,
                        date,
                        startTime,
                    });
                }
            );
        });

        if (newClasses.length > 0) {
            this.store.dispatch(new AddClasses(newClasses));
            this.router.navigateByUrl('/class');
        }
    }

    onPeriodChange(event) {
        this.selectedDates = event.selectedValues;
    }

    initaliseForm() {
        this.classForm = this.fb.group({
            classes: this.fb.array([this.initClass()]),
        });
    }

    initClass() {
        return this.fb.group({
            classType: ['Adults', Validators.required],
            startTime: ['18:30', Validators.required],
            isGrading: [false],
        });
    }

    removeClass(i: number) {
        const control = this.classForm.controls['classes'] as FormArray;
        control.removeAt(i);
    }

    addClass() {
        const control = this.classForm.controls['classes'] as FormArray;
        control.push(this.initClass());
    }

    getFormElement(index) {
        const formArray = this.classForm.get('classes') as FormArray;
        return formArray.at(index);
    }
}
