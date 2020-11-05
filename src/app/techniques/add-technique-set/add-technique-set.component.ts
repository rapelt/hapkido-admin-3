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
import { MessagesService } from '../../common/messages/messages.service';
import { emptyValidator } from '../../common/validators/empty.validator';
import {
    ActionTypes,
    AddNewTechniqueSet,
    EditTechniqueSet,
} from '../../app-store/technique-state/techniques.actions';
import { Router } from '@angular/router';

@Component({
    selector: 'app-add-technique-set',
    templateUrl: './add-technique-set.component.html',
    styleUrls: ['./add-technique-set.component.scss'],
})
export class AddTechniqueSetComponent implements OnInit, OnDestroy {
    subsc;
    newTechniqueSet: FormGroup;
    sidebarTitleDefault = 'New Technique Set';
    sidebarTitle;
    saveAttempted = false;

    validation_messages = {
        title: [
            { type: 'required', message: 'Title is required' },
            {
                type: 'maxlength',
                message: 'Title must be 100 characters or less',
            },
            { type: 'empty', message: 'Title is required' },
        ],
    };

    @Output()
    cancel = new EventEmitter<any>();

    _techniqueSetName;
    @Input() set techniqueSetName(val) {
        this._techniqueSetName = val;
        if (this.newTechniqueSet) {
            this.newTechniqueSet.setValue({ title: val });
        }
    }

    get techniqueSetName() {
        return this._techniqueSetName;
    }

    @Input()
    techniqueSetId = -1;

    constructor(
        private store: Store<AppState>,
        public router: Router,
        private actionsSubject: ActionsSubject,
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.subsc = this.actionsSubject.subscribe(data => {
            if (data.type === ActionTypes.Add_new_technique_set_success) {
                this.newTechniqueSet.reset({ title: '' });
            }

            if (data.type === ActionTypes.Edit_technique_set_success) {
                this.newTechniqueSet.reset({ title: '' });
            }
        });

        this.newTechniqueSet = this.fb.group({
            title: [
                this.techniqueSetName,
                [Validators.maxLength(100), emptyValidator()],
            ],
        });
    }

    save() {
        this.saveAttempted = true;
        if (this.newTechniqueSet.valid && this.techniqueSetId === -1) {
            this.addTechniqueSet(this.newTechniqueSet.get('title').value);
        }

        if (this.newTechniqueSet.valid && this.techniqueSetId !== -1) {
            this.editTechniqueSet(this.newTechniqueSet.get('title').value);
        }
    }

    addTechniqueSet(techniqueName) {
        this.store.dispatch(new AddNewTechniqueSet(techniqueName));
    }

    editTechniqueSet(techniqueName) {
        console.log(this.techniqueSetId);
        this.store.dispatch(
            new EditTechniqueSet({
                id: this.techniqueSetId,
                name: techniqueName,
            })
        );
    }

    close() {
        this.saveAttempted = false;
        this.newTechniqueSet.reset({ title: '' });
        this.cancel.emit();
    }

    ngOnDestroy(): void {
        this.subsc.unsubscribe();
    }
}
