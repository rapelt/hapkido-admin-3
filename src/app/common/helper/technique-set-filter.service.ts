import { Injectable } from '@angular/core';
import { AutoCompleteService } from 'ionic4-auto-complete';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.reducers';
import { GetAllTechniquesSets } from '../../techniques/state/techniques.actions';
import { selectTechniquesSets } from '../../techniques/state/techniques.selectors';
import { TechniqueSetModel } from '../models/technique-set';

@Injectable({
    providedIn: 'root',
})
export class TechniqueSetFilterService implements AutoCompleteService {
    labelAttribute = 'name';

    public objects: TechniqueSetModel[] = [];

    constructor(private store: Store<AppState>) {
        this.store.dispatch(new GetAllTechniquesSets());

        this.store
            .select(selectTechniquesSets)
            .pipe()
            .subscribe((techniqueSets: TechniqueSetModel[]) => {
                this.objects = techniqueSets;
            });
    }

    getResults(keyword) {
        keyword = keyword.toLowerCase();

        return this.objects.filter(object => {
            const value = object[this.labelAttribute].toLowerCase();

            return value.includes(keyword);
        });
    }
}
