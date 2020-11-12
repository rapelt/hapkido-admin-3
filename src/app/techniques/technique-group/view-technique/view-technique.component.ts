import { Component, OnDestroy, OnInit } from '@angular/core';
import { TechniqueModel } from '../../../common/models/technique';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { AppState } from '../../../app-store/state/app.reducers';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PopoverController } from '@ionic/angular';
import { map, takeWhile } from 'rxjs/operators';
import { techniqueSelector } from './view-technique.selector';
import { SearchablePageComponent } from '../../../common/Searchable-Page.component';
import { DestroySubscribers } from 'ngx-destroy-subscribers';
import { SocketioService } from '../../../common/services/socketio.service';
import { selectTechniquesloaded } from '../../technique-list-group/technique-list/technique-list.selector';
import { PopoverMenuComponent } from '../../common/popover-menu/popover-menu.component';

@Component({
    selector: 'app-view-technique',
    templateUrl: './view-technique.component.html',
    styleUrls: ['./view-technique.component.scss'],
})
@DestroySubscribers()
export class ViewTechniqueComponent extends SearchablePageComponent
    implements OnInit {
    technique: Observable<TechniqueModel>;
    sidePaneOpen = false;
    sidebarTitleDefault = 'Add media';
    sidebarTitle;
    sidePanelData: TechniqueModel = this.techniqueReset();
    techniqueId: number;
    techniquesSetId: number;

    breadcrumbs = [];

    constructor(
        private store: Store<AppState>,
        public router: Router,
        private actionsSubject: ActionsSubject,
        public popoverController: PopoverController,
        private activatedRoute: ActivatedRoute,
        private io: SocketioService
    ) {
        super();
    }

    ngOnInit() {
        this.io.getServerUpdates().subscribe(something => {
            // console.log(something);
        });

        this.subscriber = this.activatedRoute.paramMap.subscribe(
            (params: ParamMap) => {
                this.techniqueId = parseInt(params.get('techniqueId'), 10);
                this.updateTechnique();
            }
        );

        this.subscriber = this.store
            .pipe(
                takeWhile(() => this.isAlive),
                map(selectTechniquesloaded)
            )
            .subscribe(allValuesLoaded => {
                this.loaded = allValuesLoaded;
            });
    }

    updateTechnique() {
        this.technique = this.store.select(techniqueSelector(this.techniqueId));

        this.subscriber = this.technique.subscribe(technique => {
            if (technique) {
                this.setBreadcrumbs(technique);
            }
        });
    }

    async newTechnique() {
        this.sidePaneOpen = true;
    }

    goToMedia(techniqueId) {
        // this.router.navigate(['technique/view/' + techniqueId]);
    }

    showProgressBar(uploadStatus) {
        if (uploadStatus === 'Uploaded' || uploadStatus === 'Error') {
            return false;
        }

        return true;
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

    setBreadcrumbs(technique: TechniqueModel) {
        this.breadcrumbs = [
            {
                name: 'Techniques',
                navigate: '/technique/list',
            },
            {
                name: technique.techniqueSet.name,
                navigate: '/technique/list/' + technique.techniqueSet.id,
            },
            {
                name: technique.title,
                navigate: '/technique/view/' + technique.id,
            },
        ];
    }
}
