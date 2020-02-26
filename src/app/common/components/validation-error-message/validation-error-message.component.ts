import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
    selector: 'app-validation-error-message',
    templateUrl: './validation-error-message.component.html',
    styleUrls: ['./validation-error-message.component.scss'],
})
export class ValidationErrorMessageComponent implements OnInit {
    @Input()
    validationMessages: Array<{ type: string; message: string }>;

    @Input()
    formElement: AbstractControl;

    @Input()
    saveAttempted = false;

    constructor() {}

    ngOnInit() {}
}
