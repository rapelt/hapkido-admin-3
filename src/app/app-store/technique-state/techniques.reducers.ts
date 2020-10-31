import { ActionTypes, TechniquesActions } from './techniques.actions';
import * as _ from 'underscore';
import { TechniqueModel } from '../../common/models/technique';
import { TechniqueSetModel } from '../../common/models/technique-set';

export const TECHNIQUES_FEATURE_NAME = 'techniques';

export interface TechniquesState {
    techniques: TechniqueModel[];
    selectedTechnique: any;
    loaded: boolean;
    techniqueSets: TechniqueSetModel[];
    techniqueSetsLoaded: boolean;
}

const initialState: TechniquesState = {
    techniques: [],
    selectedTechnique: null,
    loaded: false,
    techniqueSets: [],
    techniqueSetsLoaded: false,
};

export function techniquesReducer(
    state = initialState,
    action: TechniquesActions
) {
    switch (action.type) {
        case ActionTypes.Get_all_techniques_success:
            return {
                ...state,
                techniques: action.payload,
                loaded: true,
            };
        case ActionTypes.Get_all_techniques_sets_success:
            return {
                ...state,
                techniqueSets: action.payload,
                techniqueSetsLoaded: true,
            };
        case ActionTypes.Add_new_technique_success:
            return {
                ...state,
                techniques: [...state.techniques, action.payload],
            };
        case ActionTypes.Add_new_technique_set_success:
            return {
                ...state,
                techniqueSets: [...state.techniqueSets, action.payload],
            };
        case ActionTypes.Edit_technique_success:
            const editedTechnique = {
                ...action.payload,
            };
            const editTechniqueIndex = state.techniques.findIndex(s => {
                return s.id === action.payload.id;
            });

            const editTechniquesList = [...state.techniques];
            editTechniquesList[editTechniqueIndex] = editedTechnique;

            return {
                ...state,
                techniques: editTechniquesList,
                selectedTechnique: editedTechnique,
            };
        case ActionTypes.Edit_technique_set_success:
            const editedTechniqueSet = {
                ...action.payload,
            };
            const editTechniqueSetIndex = state.techniqueSets.findIndex(s => {
                return s.id === action.payload.id;
            });

            const editTechniquesSetList = [...state.techniqueSets];
            editTechniquesSetList[editTechniqueSetIndex] = editedTechniqueSet;

            return {
                ...state,
                techniqueSets: editTechniquesSetList,
            };
        case ActionTypes.Deactivate_technique_set_success:
            const newTechniquesSetList = [...state.techniqueSets].filter(
                s => s.id !== action.payload
            );

            return {
                ...state,
                techniqueSets: newTechniquesSetList,
            };
        case ActionTypes.Set_selected_technique:
            const technique = state.techniques.find(s => {
                return s.id === action.payload;
            });
            return {
                ...state,
                selectedTechnique: technique,
            };
        case ActionTypes.Reset_selected_technique:
            return {
                ...state,
                selectedTechnique: null,
            };
        case ActionTypes.Clear_loaded:
            return {
                ...state,
                loaded: false,
            };
        default:
            return state;
    }
}

function getIndexOfTechnique(
    techniques: TechniqueModel[],
    hbId: string
): number {
    return _.findIndex(techniques, { hbId: hbId });
}
