import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AddNewTechnique } from '../../app-store/technique-state/techniques.actions';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../app-store/state/app.reducers';
import { filter, map, takeWhile } from 'rxjs/operators';
import { PageComponent } from '../../common/page.component';
import { Observable } from 'rxjs';
import { TechniqueModel } from '../../common/models/technique';
import {
    selectTechniquesloaded,
    techniqueSetSelector,
    techniquesSelector,
} from './technique-list.selector';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { TechniqueSetModel } from '../../common/models/technique-set';

@Component({
    selector: 'app-technique-list',
    templateUrl: './technique-list.component.html',
    styleUrls: ['./technique-list.component.scss'],
})
export class TechniqueListComponent extends PageComponent implements OnInit {
    loaded = true;
    techniques: Observable<TechniqueModel[]>;
    searchvalue = '';
    techniqueSetId: number;
    techniquesSet: Observable<TechniqueSetModel>;

    constructor(
        public alertController: AlertController,
        private store: Store<AppState>,
        private activatedRoute: ActivatedRoute
    ) {
        super();
    }

    ngOnInit() {
        this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
            this.techniqueSetId = parseInt(params.get('techniqueSet'), 10);
            this.techniques = this.store.pipe(
                filter(() => this.loaded),
                select(techniquesSelector(this.techniqueSetId)),
                takeWhile(() => this.isAlive)
            );

            this.techniquesSet = this.store.pipe(
                filter(() => this.loaded),
                select(techniqueSetSelector(this.techniqueSetId)),
                takeWhile(() => this.isAlive)
            );
        });

        this.store
            .pipe(
                takeWhile(() => this.isAlive),
                map(selectTechniquesloaded)
            )
            .subscribe(allValuesLoaded => {
                this.loaded = allValuesLoaded;
            });
    }

    addTechnique(techniqueName) {
        // console.log(techniqueName.name);
        this.store.dispatch(new AddNewTechnique(techniqueName));
    }

    async newTechnique() {
        const alert = await this.alertController.create({
            header: 'New technique',
            inputs: [
                {
                    name: 'name',
                    type: 'text',
                    placeholder: 'Technique name',
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: () => {
                        console.log('Confirm Cancel');
                    },
                },
                {
                    text: 'Ok',
                    handler: techniqueName => {
                        this.addTechnique(techniqueName);
                    },
                },
            ],
        });

        await alert.present();
    }

    searchInput(event) {
        this.searchvalue = event.detail.value;
    }

    cancelSearch() {
        this.searchvalue = '';
    }

    goToTechniqueSet(techniqueSet) {}
}
