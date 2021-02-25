import { createSelector } from '@ngrx/store';
import {
    selectTechniqueLoaded,
    selectTechniqueSetsLoaded,
    selectTechniquesSets,
} from '../../../app-store/technique-state/techniques.selectors';
import { TechniqueSetModel } from '../../../common/models/technique-set';

export const techniqueSetSelector = createSelector(
    selectTechniquesSets,
    (techniqueSets: TechniqueSetModel[]) => {
        return techniqueSets;
    }
);

export const selectTechniqueListloaded = createSelector(
    selectTechniqueLoaded,
    selectTechniqueSetsLoaded,
    (techniquesLoaded, techniquesSetsLoaded) => {
        return techniquesLoaded && techniquesSetsLoaded;
    }
);
