import { createSelector } from '@ngrx/store';
import {
    selectTechniqueLoaded,
    selectTechniques,
    selectTechniqueSetsLoaded,
    selectTechniquesSets,
} from '../../app-store/technique-state/techniques.selectors';
import { TechniqueSetModel } from '../../common/models/technique-set';
import { TechniqueModel } from '../../common/models/technique';

export const techniquesSelector = techniqueSetId =>
    createSelector(selectTechniques, (techniques: TechniqueModel[]) => {
        return techniques.filter(
            technique => technique.techniqueSet.id === techniqueSetId
        );
    });

export const techniqueSetSelector = techniqueSetId =>
    createSelector(
        selectTechniquesSets,
        (techniqueSets: TechniqueSetModel[]) => {
            return techniqueSets.find(techniqueSet => {
                return techniqueSet.id === techniqueSetId;
            });
        }
    );

export const selectTechniquesloaded = createSelector(
    selectTechniqueLoaded,
    selectTechniqueSetsLoaded,
    (techniquesLoaded, techniquesSetsLoaded) => {
        return techniquesLoaded && techniquesSetsLoaded;
    }
);
