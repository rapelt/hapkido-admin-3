import {
    ChangeDetectionStrategy,
    Component,
    forwardRef,
    Input,
    OnChanges,
    OnInit,
} from '@angular/core';
import {
    ControlValueAccessor,
    FormControl,
    NG_VALIDATORS,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { InputModel } from './input.model';
import { FormElementDirective } from '../form-element.directive';

@Component({
    selector: 'app-input',
    templateUrl: './input.component.html',
    styleUrls: ['./input.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => InputComponent),
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => InputComponent),
            multi: true,
        },
    ],
})
export class InputComponent extends FormElementDirective implements OnInit {
    @Input()
    formData: InputModel;

    constructor() {
        super();
    }

    ngOnInit() {
        this.formElement = new FormControl('', this.formData.validators);
    }
}
