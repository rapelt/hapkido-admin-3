import {
    ChangeDetectionStrategy,
    Component,
    forwardRef,
    Input,
    OnInit,
} from '@angular/core';
import { FormElementDirective } from '../form-element.directive';
import { InputModel } from '../input/input.model';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-radio-buttons',
    templateUrl: './radio-buttons.component.html',
    styleUrls: ['./radio-buttons.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => RadioButtonsComponent),
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => RadioButtonsComponent),
            multi: true,
        },
    ],
})
export class RadioButtonsComponent extends FormElementDirective
    implements OnInit {
    @Input()
    formData: InputModel;

    constructor() {
        super();
    }

    ngOnInit() {
        this.formElement = new FormControl('', this.formData.validators);
    }
}
