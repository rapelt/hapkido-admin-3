import {
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionsSubject, Store } from '@ngrx/store';
import { AppState } from '../../app-store/state/app.reducers';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
    ActionTypes,
    AddNewTechnique,
    EditTechnique,
} from '../../app-store/technique-state/techniques.actions';
import { emptyValidator } from '../../common/validators/empty.validator';
import { TechniqueModel } from '../../common/models/technique';
import { GradeModel } from '../../common/helper/grade/grade.model';
import { GradeHelper } from '../../common/helper/grade/grade';
import { getFormData } from './add-technique-form.data';
import { TechniqueSetModel } from '../../common/models/technique-set';

@Component({
    selector: 'app-add-technique',
    templateUrl: './add-technique.component.html',
    styleUrls: ['./add-technique.component.scss'],
})
export class AddTechniqueComponent implements OnInit, OnDestroy {
    subsc;
    activatedRouteSubscriber;
    form: FormGroup;
    sidebarTitleDefault = 'New Technique';
    sidebarTitle;
    saveAttempted = false;
    grades: GradeModel[] = [];
    techniqueSet: TechniqueSetModel = { id: -1, name: '' };

    formData: {
        title: any;
        description: any;
        grade: any;
        tags: any;
    } = getFormData();

    @Output()
    cancel = new EventEmitter<any>();

    _technique: TechniqueModel;
    @Input() set technique(val) {
        this._technique = val;
        if (this.form) {
            this.techniqueSet = val.techniqueSet;
            this.techniqueId = val.id;
            this.form.setValue({
                title: val.title,
                description: val.description,
                grade: val.grade,
                tags: val.tags,
            });
        }
    }

    get technique(): TechniqueModel {
        return this._technique;
    }

    @Input()
    techniqueId = -1;

    constructor(
        private store: Store<AppState>,
        public activatedRoute: ActivatedRoute,
        private actionsSubject: ActionsSubject,
        private fb: FormBuilder,
        private gradeHelper: GradeHelper
    ) {}

    ngOnInit() {
        this.form = this.fb.group({
            [this.formData.title.id]: ['', this.formData.title.validators],
            [this.formData.description.id]: [
                '',
                this.formData.description.validators,
            ],
            [this.formData.grade.id]: ['', this.formData.grade.validators],
            [this.formData.tags.id]: [
                [{ id: 1, name: 'Instructor' }],
                this.formData.tags.validators,
            ],
        });

        this.activatedRouteSubscriber = this.activatedRoute.paramMap.subscribe(
            (params: ParamMap) => {
                this.techniqueSet.id = parseInt(params.get('techniqueSet'), 10);
            }
        );

        this.grades = this.gradeHelper.getAllGrades();

        this.subsc = this.actionsSubject.subscribe(data => {
            if (data.type === ActionTypes.Add_new_technique_success) {
                this.form.reset(this.techniqueReset());
            }

            if (data.type === ActionTypes.Edit_technique_success) {
                this.form.reset(this.techniqueReset());
            }
        });
    }

    save() {
        this.saveAttempted = true;
        if (this.form.valid && this.techniqueId === -1) {
            const newTechnique: Partial<TechniqueModel> = {
                ...this.form.value,
                techniqueSet: {
                    id: this.techniqueSet,
                },
            };
            this.addTechnique(newTechnique);
        }

        if (this.form.valid && this.techniqueId !== -1) {
            const newTechnique: Partial<TechniqueModel> = {
                ...this.form.value,
                id: this.techniqueId,
                techniqueSet: this.techniqueSet,
            };
            this.editTechnique(newTechnique);
        }
    }

    addTechnique(technique: Partial<TechniqueModel>) {
        this.store.dispatch(new AddNewTechnique(technique));
    }

    editTechnique(newData: Partial<TechniqueModel>) {
        this.store.dispatch(
            new EditTechnique({
                ...this.technique,
                ...newData,
            })
        );
    }

    techniqueReset(): Partial<TechniqueModel> {
        return {
            description: '',
            title: '',
            grade: null,
        };
    }

    close() {
        this.saveAttempted = false;
        this.form.reset({ title: '' });
        this.cancel.emit();
    }

    ngOnDestroy(): void {
        this.subsc.unsubscribe();
        this.activatedRouteSubscriber.unsubscribe();
    }
}
