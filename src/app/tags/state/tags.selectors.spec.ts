//
// import { createTechniqueAll } from '../../../testing-helpers/technique-test-helper';
// import { ClassesState } from '../../classes/state/classes.reducers';
// import { AppState } from '../../state/app.reducers';
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
//         const state: AppState = {
//             techniques: techniqueState,
//             classes: null,
//             authentication: null,
//         };
//
//         expect(selectSelectedTechnique(activeTechnique.hbId)(state)).toEqual(
//             activeTechnique
//         );
//     });
// });
