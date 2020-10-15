import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

import { ActivatedRouteSnapshot } from '@angular/router';
import { AppState } from '../app-store/state/app.reducers';
import { Store } from '@ngrx/store';
import {
    GetAllTechniques,
    GetAllTechniquesSets,
} from '../app-store/technique-state/techniques.actions';
import { GetAllTags } from '../app-store/tags-state/tags.actions';
import { filter, withLatestFrom } from 'rxjs/operators';
import {
    selectSelectedTechnique,
    selectTechniqueFeatureLoaded,
    selectTechniquesSets,
} from '../app-store/technique-state/techniques.selectors';
import { selectTags } from '../app-store/tags-state/tags.selectors';
import {
    GetAllPhotos,
    GetAllVideos,
} from '../app-store/media-state/media.actions';

@Injectable()
export class TechniquesDataDispatcher implements Resolve<any> {
    constructor(private store: Store<AppState>) {}

    resolve(route: ActivatedRouteSnapshot) {
        this.store.select(selectTechniqueFeatureLoaded).subscribe(allLoaded => {
            if (allLoaded) {
                console.log('Technique Feature Data Loaded Already');
                return {};
            } else {
                console.log('Technique Feature Data Resolver Getting Data');
                this.store.dispatch(new GetAllTechniques());
                this.store.dispatch(new GetAllTechniquesSets());
                this.store.dispatch(new GetAllTags());
                this.store.dispatch(new GetAllPhotos());
                this.store.dispatch(new GetAllVideos());
                return {};
            }
        });
    }
}
