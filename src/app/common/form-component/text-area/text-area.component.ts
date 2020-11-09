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
import { TextAreaModel } from './text-area.model';
import { FormElementDirective } from '../form-element.directive';
import { InputModel } from '../input/input.model';

@Component({
    selector: 'app-text-area',
    templateUrl: './text-area.component.html',
    styleUrls: ['./text-area.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => TextAreaComponent),
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => TextAreaComponent),
            multi: true,
        },
    ],
})
export class TextAreaComponent extends FormElementDirective implements OnInit {
    @Input()
    formData: TextAreaModel;

    constructor() {
        super();
    }

    ngOnInit() {
        this.formElement = new FormControl('', this.formData.validators);
    }
}
