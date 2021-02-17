import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
    selector: 'app-validation-error-message',
    templateUrl: './validation-error-message.component.html',
    styleUrls: ['./validation-error-message.component.scss'],
})
export class ValidationErrorMessageComponent implements OnInit, OnChanges {
    @Input()
    validationMessages: { type: string; message: string }[];

    @Input()
    formElement: AbstractControl;

    @Input()
    saveAttempted = false;

    constructor() {}

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges) {}
}
