import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TechniqueSetModel } from '../../common/models/technique-set';
import { AlertController } from '@ionic/angular';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { AppState } from '../../app-store/state/app.reducers';
import { filter, map, takeWhile } from 'rxjs/operators';
import {
    selectTechniqueListloaded,
    techniqueSetSelector,
} from './technique-set-list.selector';
import {
    ActionTypes,
    AddNewTechnique,
    AddNewTechniqueSet,
} from '../../app-store/technique-state/techniques.actions';
import { PageComponent } from '../../common/page.component';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emptyValidator } from '../../common/validators/empty.validator';
import * as moment from 'moment';

@Component({
    selector: 'app-technique-set-list',
    templateUrl: './technique-set-list.component.html',
    styleUrls: ['./technique-set-list.component.scss'],
})
export class TechniqueSetListComponent extends PageComponent
    implements OnInit, OnDestroy {
    loaded = true;
    techniqueSets: Observable<TechniqueSetModel[]>;
    searchvalue = '';
    subsc;
    segment = 'list';
    sidePaneOpen = false;
    newTechniqueSet: FormGroup;
    saveAttempted: false;
    sidebarTitleDefault = 'New Technique Set';
    sidebarTitle;

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

    constructor(
        private store: Store<AppState>,
        public router: Router,
        private actionsSubject: ActionsSubject,
        private fb: FormBuilder
    ) {
        super();
    }

    ngOnInit() {
        this.techniqueSets = this.store.pipe(
            filter(() => this.loaded),
            select(techniqueSetSelector),
            takeWhile(() => this.isAlive)
        );

        this.store
            .pipe(
                takeWhile(() => this.isAlive),
                map(selectTechniqueListloaded)
            )
            .subscribe(allValuesLoaded => {
                this.loaded = allValuesLoaded;
            });

        this.subsc = this.actionsSubject.subscribe(data => {
            if (data.type === ActionTypes.Add_new_technique_set_success) {
                this.segmentChanged({ detail: { value: 'list' } });
                this.sidePaneOpen = false;
                this.newTechniqueSet.reset({ title: '' });
            }
        });

        this.newTechniqueSet = this.fb.group({
            title: ['', [Validators.maxLength(100), emptyValidator()]],
        });
    }

    addTechnique(techniqueName) {
        // console.log(techniqueName.name);
        this.store.dispatch(new AddNewTechniqueSet(techniqueName));
    }

    closeSidePanel() {
        this.sidePaneOpen = false;
    }

    async newTechnique() {
        this.sidePaneOpen = true;
    }

    searchInput(event) {
        this.searchvalue = event.detail.value;
    }

    cancelSearch() {
        this.searchvalue = '';
    }

    goToTechniqueSet(techniqueSetId) {
        this.router.navigate(['technique/list/' + techniqueSetId]);
    }

    save() {
        this.addTechnique(this.newTechniqueSet.get('title').value);
    }

    cancel() {}

    segmentChanged(event) {
        this.segment = event.detail.value;
    }

    ngOnDestroy(): void {
        this.subsc.unsubscribe();
    }
}
