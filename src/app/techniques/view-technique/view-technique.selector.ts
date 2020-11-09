import { createSelector } from '@ngrx/store';
import { selectTechniques } from '../../app-store/technique-state/techniques.selectors';
import { TechniqueModel } from '../../common/models/technique';

export const techniqueSelector = id =>
    createSelector(selectTechniques, (techniques: TechniqueModel[]) => {
        console.log('Getting Techniques', techniques);
        return techniques.find(t => {
            console.log(t.id, id);
            return t.id === id;
        });
    });
