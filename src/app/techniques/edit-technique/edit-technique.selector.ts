import { createSelector } from '@ngrx/store';
import * as techniquesSelector from '../../app-store/technique-state/techniques.selectors';
import * as tagsSelector from '../../app-store/tags-state/tags.selectors';

export const selectLoaded = createSelector(
    techniquesSelector.selectTechniqueSetsLoaded,
    techniquesSelector.selectTechniqueLoaded,
    tagsSelector.selectTagLoaded,
    (ts, t, tags) => {
        return ts && t && tags;
    }
);
