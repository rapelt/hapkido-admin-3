import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-store/state/app.reducers';
import { MessagesService } from '../../common/messages/messages.service';
import { emptyValidator } from '../../common/validators/empty.validator';
import { AddNewTechniqueSet } from '../../app-store/technique-state/techniques.actions';

@Component({
    selector: 'app-add-technique-set',
    templateUrl: './add-technique-set.component.html',
    styleUrls: ['./add-technique-set.component.scss'],
})
export class AddTechniqueSetComponent implements OnInit {
    validation_messages = {
        techniqueSet: [
            { type: 'empty', message: 'Technique Set Name is required' },
        ],
    };

    newTechniqueSetForm: FormGroup;
    saveAttempted = false;

    constructor(
        private fb: FormBuilder,
        private store: Store<AppState>,
        private messages: MessagesService
    ) {}

    ngOnInit() {
        this.newTechniqueSetForm = this.fb.group({
            techniqueSet: ['', [emptyValidator()]],
        });
    }

    save() {
        this.saveAttempted = true;
        if (this.newTechniqueSetForm.invalid) {
            this.messages.updateError.next(
                'Looks like you have tried to submit an invalid form. Update the form and try again.'
            );
        } else {
            const saveValues = this.newTechniqueSetForm.value;

            this.store.dispatch(new AddNewTechniqueSet(saveValues));
            // this.navController.navigateBack('/student/list/active');
        }
    }

    cancel() {
        // this.navController.navigateBack('/student/list/active');
    }
}
