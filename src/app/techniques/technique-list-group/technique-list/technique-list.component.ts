import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TechniqueSetModel } from '../../../common/models/technique-set';
import { PopoverController } from '@ionic/angular';
import { ActionsSubject, Store } from '@ngrx/store';
import { AppState } from '../../../app-store/state/app.reducers';
import { map, takeWhile } from 'rxjs/operators';

import { ActionTypes } from '../../../app-store/technique-state/techniques.actions';
import { PageComponent } from '../../../common/page.component';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TechniqueModel } from '../../../common/models/technique';
import {
    selectTechniquesloaded,
    techniqueSetSelector,
    techniquesSelector,
} from './technique-list.selector';
import { PopoverMenuComponent } from '../../common/popover-menu/popover-menu.component';

@Component({
    selector: 'app-technique-list',
    templateUrl: './technique-list.component.html',
    styleUrls: ['./technique-list.component.scss'],
})
export class TechniqueListComponent extends PageComponent
    implements OnInit, OnDestroy {
    loaded = false;
    techniques: Observable<TechniqueModel[]>;
    searchvalue = '';
    subsc;
    sidePaneOpen = false;
    sidebarTitleDefault = 'New Technique';
    sidebarTitle;
    sidePanelData: TechniqueModel = this.techniqueReset();
    techniqueSetId: number;
    techniquesSet: Observable<TechniqueSetModel>;

    breadcrumbs: Array<{
        name: string;
        navigate: string;
    }> = [];

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
            this.updateTechniques();
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
            .subscribe((allValuesLoaded: boolean) => {
                console.log(allValuesLoaded, 'All Values loaded');
                this.loaded = allValuesLoaded;
            });
    }

    updateTechniques() {
        this.techniques = this.store.select(
            techniquesSelector(this.techniqueSetId)
        );

        this.techniques.subscribe(t => {
            console.log('Technqiues Changed', t);
        });

        this.techniquesSet = this.store.select(
            techniqueSetSelector(this.techniqueSetId)
        );

        this.techniquesSet.subscribe(tSet => {
            if (tSet) {
                this.setBreadcrumbs(tSet);
            }
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
        this.sidePanelData = this.techniqueReset();
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

    techniqueReset(): TechniqueModel {
        return {
            id: -1,
            media: [],
            description: '',
            title: '',
            grade: null,
            techniqueSet: {
                id: -1,
                name: '',
            },
            tags: [],
        };
    }

    setBreadcrumbs(tset: TechniqueSetModel) {
        this.breadcrumbs = [
            {
                name: 'Techniques',
                navigate: '/technique/list',
            },
            {
                name: tset.name,
                navigate: '/technique/list/' + tset.id,
            },
        ];
    }

    ngOnDestroy(): void {
        this.subsc.unsubscribe();
    }
}
