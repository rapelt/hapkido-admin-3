import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { AppState } from '../app-store/state/app.reducers';
import { Store } from '@ngrx/store';
import {
    GetAllTechniques,
    GetAllTechniquesSets,
} from '../app-store/technique-state/techniques.actions';
import { GetAllTags } from '../app-store/tags-state/tags.actions';
import { selectTechniqueFeatureLoaded } from '../app-store/technique-state/techniques.selectors';
import { selectTags } from '../app-store/tags-state/tags.selectors';
import { GetAllMedias } from '../app-store/media-state/media.actions';

@Injectable()
export class TechniquesDataDispatcher implements Resolve<any> {
    constructor(private store: Store<AppState>) {}

    resolve() {
        this.store.select(selectTechniqueFeatureLoaded).subscribe(allLoaded => {
            if (allLoaded) {
                return {};
            } else {
                this.store.dispatch(new GetAllTechniques());
                this.store.dispatch(new GetAllTechniquesSets());
                this.store.dispatch(new GetAllTags());
                this.store.dispatch(new GetAllMedias());
                return {};
            }
        });
    }
}
