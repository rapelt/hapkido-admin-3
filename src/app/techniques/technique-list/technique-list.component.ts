import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TechniqueSetModel } from '../../common/models/technique-set';
import { AlertController, PopoverController } from '@ionic/angular';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { AppState } from '../../app-store/state/app.reducers';
import { filter, map, takeWhile } from 'rxjs/operators';

import {
    ActionTypes,
    DeactivateTechniqueSet,
} from '../../app-store/technique-state/techniques.actions';
import { PageComponent } from '../../common/page.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PopoverMenuComponent } from '../technique-set-list/popover-menu/popover-menu.component';
import { TechniqueModel } from '../../common/models/technique';
import {
    selectTechniquesloaded,
    techniqueSetSelector,
    techniquesSelector,
} from './technique-list.selector';

@Component({
    selector: 'app-technique-list',
    templateUrl: './technique-list.component.html',
    styleUrls: ['./technique-list.component.scss'],
})
export class TechniqueListComponent extends PageComponent
    implements OnInit, OnDestroy {
    loaded = true;
    techniques: Observable<TechniqueModel[]>;
    searchvalue = '';
    subsc;
    sidePaneOpen = false;
    sidebarTitleDefault = 'New Technique';
    sidebarTitle;
    sidePanelData: TechniqueModel = this.techniqueReset();
    techniqueSetId: number;
    techniquesSet: Observable<TechniqueSetModel>;

    constructor(
        private store: Store<AppState>,
        public router: Router,
        private actionsSubject: ActionsSubject,
        public popoverController: PopoverController,
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

        this.subsc = this.actionsSubject.subscribe(data => {
            if (
                data.type === ActionTypes.Add_new_technique_success ||
                data.type === ActionTypes.Edit_technique_success
            ) {
                this.sidePanelData = this.techniqueReset();
                this.closeSidePanel();
            }
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

    async newTechnique() {
        this.sidePaneOpen = true;
    }

    searchInput(event) {
        this.searchvalue = event.detail.value;
    }

    cancelSearch() {
        this.searchvalue = '';
    }

    goToTechnique(techniqueId) {
        this.router.navigate(['technique/view/' + techniqueId]);
    }

    closeSidePanel() {
        this.sidePaneOpen = false;
    }

    async presentPopover(ev: any, ts: TechniqueModel) {
        const popover = await this.popoverController.create({
            component: PopoverMenuComponent,
            cssClass: 'my-custom-class',
            event: ev,
            translucent: true,
        });

        popover.onDidDismiss().then(data => {
            console.log(data, ts);

            if (data.data === 'view' || data.data === 'edit') {
                this.sidePaneOpen = true;
                this.sidePanelData = ts;
            }

            if (data.data === 'delete') {
                // this.store.dispatch(new DeactivateTechniqueSet(ts.id));
            }
        });

        return popover.present();
    }

    goToSetList() {
        this.router.navigate(['technique/list/']);
    }

    techniqueReset(): TechniqueModel {
        return {
            id: -1,
            videos: [],
            photos: [],
            description: '',
            title: '',
            grade: null,
            techniqueSet: -1,
            tags: [],
        };
    }

    ngOnDestroy(): void {
        this.subsc.unsubscribe();
    }
}
