import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TechniquesState } from './techniques.reducers';
import * as fromTechniques from './techniques.reducers';

export const getTechniquesState = createFeatureSelector<TechniquesState>(
    fromTechniques.TECHNIQUES_FEATURE_NAME
);

export const selectTechniques = createSelector(
    getTechniquesState,
    techniquesState => {
        return techniquesState.techniques;
    }
);

export const selectTechniquesSets = createSelector(
    getTechniquesState,
    techniquesState => {
        return techniquesState.techniqueSets;
    }
);

export const selectTechniqueLoaded = createSelector(
    getTechniquesState,
    techniquesState => {
        return techniquesState.loaded;
    }
);

export const selectTechniqueSetsLoaded = createSelector(
    getTechniquesState,
    techniquesState => {
        return techniquesState.techniqueSetsLoaded;
    }
);

export const selectSelectedTechnique = (id: number) =>
    createSelector(getTechniquesState, techniquesState => {
        if (techniquesState.techniques.length === 0) {
            return null;
        }

        return techniquesState.techniques.find(s => {
            return s.id === id;
        });
    });

export const selectTechniqueSetById = (id: number) =>
    createSelector(getTechniquesState, techniquesState => {
        if (techniquesState.techniqueSets.length === 0) {
            return null;
        }

        return techniquesState.techniqueSets.find(s => {
            return s.id === id;
        });
    });
