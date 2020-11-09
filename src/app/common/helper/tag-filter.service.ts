import { Injectable } from '@angular/core';
import { GetAllTechniquesSets } from '../../app-store/technique-state/techniques.actions';
import { selectTechniquesSets } from '../../app-store/technique-state/techniques.selectors';
import { TechniqueSetModel } from '../models/technique-set';
import { Store } from '@ngrx/store';
import { AppState } from '../../app-store/state/app.reducers';
import { TagModel } from '../models/tag';
import { selectTags } from '../../app-store/tags-state/tags.selectors';
import { GetAllTags } from '../../app-store/tags-state/tags.actions';

@Injectable({
    providedIn: 'root',
})
export class TagFilterService {
    labelAttribute = 'name';

    public objects: TagModel[] = [];

    constructor(private store: Store<AppState>) {
        this.store.dispatch(new GetAllTags());

        this.store
            .select(selectTags)
            .pipe()
            .subscribe((tags: TagModel[]) => {
                this.objects = tags;
            });
    }

    getResults(keyword) {
        keyword = keyword.toLowerCase();

        if (this.objects.length === 0) {
            return [];
        }

        return this.objects.filter(object => {
            const value = object[this.labelAttribute].toLowerCase();
            return value.includes(keyword);
        });
    }
}
