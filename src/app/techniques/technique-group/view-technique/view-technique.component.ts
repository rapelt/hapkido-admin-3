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
import { MediaModel } from '../../../common/models/media';
import { ActionTypes } from '../../../app-store/technique-state/techniques.actions';

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
    sidePanelData: MediaModel = this.mediaReset();
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

        this.subscriber = this.actionsSubject.subscribe(data => {
            if (data.type === ActionTypes.Add_or_update_media) {
                this.sidePanelData = this.mediaReset();
                this.closeSidePanel();
            }
        });

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

    goToMedia(mediaId) {
        this.router.navigate([
            'technique/view/' + this.techniqueId + '/media/' + mediaId,
        ]);
    }

    showProgressBar(uploadStatus) {
        if (
            uploadStatus === 'Uploaded' ||
            uploadStatus === 'Error' ||
            uploadStatus === 'Failed'
        ) {
            return false;
        }

        return true;
    }

    closeSidePanel() {
        this.sidePaneOpen = false;
        this.sidePanelData = this.mediaReset();
    }

    async presentPopover(ev: any, ts: MediaModel) {
        const popover = await this.popoverController.create({
            component: PopoverMenuComponent,
            cssClass: 'my-custom-class',
            event: ev,
            translucent: true,
        });

        popover.onDidDismiss().then(data => {
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

    mediaReset(): MediaModel {
        return {
            id: -1,
            file_name: '',
            original_file_name: '',
            uploadStatus: 'Uploaded',
            publishedStatus: 'Draft',
            file_type: '',
            tags: [],
            folder: '',
            views: 0,
            url: '',
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
