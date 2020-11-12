import { createSelector } from '@ngrx/store';
import { selectTechniques } from '../../../app-store/technique-state/techniques.selectors';
import { TechniqueModel } from '../../../common/models/technique';

export const techniqueSelector = id =>
    createSelector(selectTechniques, (techniques: TechniqueModel[]) => {
        return techniques.find(t => {
            return t.id === id;
        });
    });
