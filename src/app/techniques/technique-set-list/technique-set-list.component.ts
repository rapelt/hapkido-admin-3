import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TechniqueSetModel } from '../../common/models/technique-set';
import { AlertController, PopoverController } from '@ionic/angular';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { AppState } from '../../app-store/state/app.reducers';
import { filter, map, takeWhile } from 'rxjs/operators';
import {
    selectTechniqueListloaded,
    techniqueSetSelector,
} from './technique-set-list.selector';
import {
    ActionTypes,
    DeactivateTechniqueSet,
} from '../../app-store/technique-state/techniques.actions';
import { PageComponent } from '../../common/page.component';
import { Router } from '@angular/router';
import { PopoverMenuComponent } from './popover-menu/popover-menu.component';

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
    sidePaneOpen = false;
    sidebarTitleDefault = 'New Technique Set';
    sidebarTitle;
    sidePanelData: TechniqueSetModel = this.techniqueSetReset();

    constructor(
        private store: Store<AppState>,
        public router: Router,
        private actionsSubject: ActionsSubject,
        public popoverController: PopoverController
    ) {
        super();
    }

    ngOnInit() {
        this.techniqueSets = this.store.pipe(
            filter(() => this.loaded),
            select(techniqueSetSelector),
            takeWhile(() => this.isAlive)
        );

        this.subsc = this.actionsSubject.subscribe(data => {
            if (
                data.type === ActionTypes.Add_new_technique_set_success ||
                data.type === ActionTypes.Edit_technique_set_success
            ) {
                this.sidePanelData = this.techniqueSetReset();
                this.closeSidePanel();
            }
        });

        this.store
            .pipe(
                takeWhile(() => this.isAlive),
                map(selectTechniqueListloaded)
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

    goToTechniqueSet(techniqueSetId) {
        this.router.navigate(['technique/list/' + techniqueSetId]);
    }

    closeSidePanel() {
        this.sidePaneOpen = false;
    }

    async presentPopover(ev: any, ts: TechniqueSetModel) {
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
                this.store.dispatch(new DeactivateTechniqueSet(ts.id));
            }
        });

        return popover.present();
    }

    techniqueSetReset() {
        return {
            id: -1,
            name: '',
        };
    }

    ngOnDestroy(): void {
        this.subsc.unsubscribe();
    }
}
