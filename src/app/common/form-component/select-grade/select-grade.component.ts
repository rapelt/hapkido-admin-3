import {
    ChangeDetectionStrategy,
    Component,
    forwardRef,
    Input,
    OnInit,
} from '@angular/core';
import { FormElementDirective } from '../form-element.directive';
import { TextAreaModel } from '../text-area/text-area.model';
import { FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectGradeModel } from './select-grade.model';
import { GradeModel } from '../../helper/grade/grade.model';
import { GradeHelper } from '../../helper/grade/grade';

@Component({
    selector: 'app-select-grade',
    templateUrl: './select-grade.component.html',
    styleUrls: ['./select-grade.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => SelectGradeComponent),
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => SelectGradeComponent),
            multi: true,
        },
    ],
})
export class SelectGradeComponent extends FormElementDirective
    implements OnInit {
    @Input()
    formData: SelectGradeModel;

    grades: GradeModel[];

    constructor(private gradeHelper: GradeHelper) {
        super();
    }

    ngOnInit() {
        this.grades = this.gradeHelper.getAllGrades();
        this.formElement = new FormControl('', this.formData.validators);
    }
}
