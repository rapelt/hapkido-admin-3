//
// import { createTechniqueAll } from '../../../testing-helpers/technique-test-helper';
// import { ClassesState } from '../../classes/technique-tags-student-media-classes-auth-state/classes.reducers';
// import { AppState } from '../../technique-tags-student-media-classes-auth-state/app.reducers';
// import { TechniquesState } from './techniques.reducers';
// import * as moment from 'moment';
// import {
//     selectSelectedTechnique,
// } from './techniques.selectors';
//
// describe('Technique Selectors', () => {
//     const activeTechnique = createTechniqueAll();
//     const inactiveTechnique = createTechniqueAll(
//         null,
//         null,
//         'hb002',
//         null,
//         null,
//         null,
//         false
//     );
//
//     it('selectSelectedTechnique should return a technique', () => {
//         const techniqueState: TechniquesState = {
//             techniques: [activeTechnique, inactiveTechnique],
//             selectedTechnique: null,
//             loaded: true,
//         };
//
//         const technique-tags-student-media-classes-auth-state: AppState = {
//             techniques: techniqueState,
//             classes: null,
//             authentication: null,
//         };
//
//         expect(selectSelectedTechnique(activeTechnique.hbId)(technique-tags-student-media-classes-auth-state)).toEqual(
//             activeTechnique
//         );
//     });
// });
