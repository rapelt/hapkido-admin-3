import { Action } from '@ngrx/store';
import { TechniqueModel } from '../../common/models/technique';
import { TechniqueSetModel } from '../../common/models/technique-set';

export enum ActionTypes {
    Get_all_techniques = '[Techniques] Get all techniques',
    Get_all_techniques_success = '[Techniques] Get all techniques success',

    Get_all_techniques_sets = '[Techniques] Get all techniques sets',
    Get_all_techniques_sets_success = '[Techniques] Set all techniques sets success',

    Set_selected_technique = '[Techniques] Set selected techniques',
    Reset_selected_technique = '[Techniques] Reset selected techniques',

    Clear_loaded = '[Techniques] Clear loaded',

    Add_new_technique = '[Techniques] Add new technique',
    Add_new_technique_success = '[Techniques] Add new technique success',

    Add_new_technique_set = '[Techniques] Add new technique set',
    Add_new_technique_set_success = '[Techniques] Add new technique success set',

    Edit_technique = '[Techniques] Edit technique',
    Edit_technique_success = '[Techniques] Edit technique success',
}

export class GetAllTechniques implements Action {
    readonly type = ActionTypes.Get_all_techniques;
}

export class GetAllTechniquesSets implements Action {
    readonly type = ActionTypes.Get_all_techniques_sets;
}

export class ClearLoadedTechniques implements Action {
    readonly type = ActionTypes.Clear_loaded;
}

export class GetAllTechniquesSuccess implements Action {
    readonly type = ActionTypes.Get_all_techniques_success;

    constructor(public payload: TechniqueModel[]) {}
}

export class GetAllTechniquesSetsSuccess implements Action {
    readonly type = ActionTypes.Get_all_techniques_sets_success;

    constructor(public payload: TechniqueSetModel[]) {}
}

export class AddNewTechnique implements Action {
    readonly type = ActionTypes.Add_new_technique;

    constructor(public payload: string) {}
}

export class AddNewTechniqueSet implements Action {
    readonly type = ActionTypes.Add_new_technique_set;

    constructor(public payload: string) {}
}

export class AddNewTechniqueSuccess implements Action {
    readonly type = ActionTypes.Add_new_technique_success;

    constructor(public payload: TechniqueModel) {}
}

export class AddNewTechniqueSetSuccess implements Action {
    readonly type = ActionTypes.Add_new_technique_set_success;

    constructor(public payload: TechniqueSetModel) {}
}

export class EditTechnique implements Action {
    readonly type = ActionTypes.Edit_technique;

    constructor(public payload: TechniqueModel) {}
}

export class EditTechniqueSuccess implements Action {
    readonly type = ActionTypes.Edit_technique_success;

    constructor(public payload: TechniqueModel) {}
}

export class SetSelectedTechnique implements Action {
    readonly type = ActionTypes.Set_selected_technique;

    constructor(public payload: number) {}
}

export class ResetSelectedTechnique implements Action {
    readonly type = ActionTypes.Reset_selected_technique;
}

export type TechniquesActions =
    | GetAllTechniques
    | GetAllTechniquesSets
    | GetAllTechniquesSetsSuccess
    | GetAllTechniquesSuccess
    | AddNewTechnique
    | AddNewTechniqueSuccess
    | SetSelectedTechnique
    | EditTechnique
    | EditTechniqueSuccess
    | ResetSelectedTechnique
    | AddNewTechniqueSet
    | AddNewTechniqueSetSuccess
    | ClearLoadedTechniques;
