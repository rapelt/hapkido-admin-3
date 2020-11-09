// import { createTechnique } from '../../../testing-helpers/technique-test-helper';
// import { SetUserAttributes } from '../../authentication/technique-tags-student-media-classes-auth-state/authentication.actions';
// import {
//     GetAllTechniques,
//     GetAllTechniquesSuccess,
// } from './techniques.actions';
// import { TechniquesState } from './techniques.reducers';
// import * as reducer from './techniques.reducers';
//
// describe('Technique Reducer', () => {
//     it('should set all techniques', () => {
//         const techniques: TechniquesState = {
//             techniques: [],
//             selectedTechnique: null,
//             loaded: false,
//         };
//
//         const expectedTechniques = {
//             techniques: [createTechnique(), createTechnique()],
//             selectedTechnique: null,
//             families: [],
//             loaded: true,
//         };
//
//         expect(
//             reducer.techniquesReducer(
//                 techniques,
//                 new GetAllTechniquesSuccess(expectedTechniques.techniques)
//             )
//         ).toEqual(expectedTechniques);
//     });
//
//     it('should return default', () => {
//         const techniques: TechniquesState = {
//             techniques: [],
//             selectedTechnique: null,
//             loaded: false,
//         };
//
//         const expectedTechniques = {
//             techniques: [createTechnique(), createTechnique()],
//             selectedTechnique: null,
//             families: [],
//             loaded: true,
//         };
//
//         expect(
//             reducer.techniquesReducer(techniques, new GetAllTechniques())
//         ).toEqual(techniques);
//     });
// });
