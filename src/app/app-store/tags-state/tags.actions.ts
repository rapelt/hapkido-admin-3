import { Action } from '@ngrx/store';
import { TagModel } from '../../common/models/tag';

export enum ActionTypes {
    Get_all_tags = '[Tags] Get all tags',
    Get_all_tags_success = '[Tags] Set all tags success',

    Set_selected_tag = '[Tags] Set selected tags',
    Reset_selected_tag = '[Tags] Reset selected tags',

    Clear_loaded = '[Tags] Clear loaded',

    Add_new_tag = '[Tags] Add new tag',
    Add_new_tag_success = '[Tags] Add new tag success',

    Edit_tag = '[Tags] Edit tag',
    Edit_tag_success = '[Tags] Edit tag success',
}

export class GetAllTags implements Action {
    readonly type = ActionTypes.Get_all_tags;
}

export class ClearLoadedTags implements Action {
    readonly type = ActionTypes.Clear_loaded;
}

export class GetAllTagsSuccess implements Action {
    readonly type = ActionTypes.Get_all_tags_success;

    constructor(public payload: TagModel[]) {}
}

export class AddNewTag implements Action {
    readonly type = ActionTypes.Add_new_tag;

    constructor(public payload: string) {}
}

export class AddNewTagSuccess implements Action {
    readonly type = ActionTypes.Add_new_tag_success;

    constructor(public payload: TagModel) {}
}

export class EditTag implements Action {
    readonly type = ActionTypes.Edit_tag;

    constructor(public payload: TagModel) {}
}

export class EditTagSuccess implements Action {
    readonly type = ActionTypes.Edit_tag_success;

    constructor(public payload: TagModel) {}
}

export class SetSelectedTag implements Action {
    readonly type = ActionTypes.Set_selected_tag;

    constructor(public payload: number) {}
}

export class ResetSelectedTag implements Action {
    readonly type = ActionTypes.Reset_selected_tag;
}

export type TagsActions =
    | GetAllTags
    | GetAllTagsSuccess
    | AddNewTag
    | AddNewTagSuccess
    | SetSelectedTag
    | EditTag
    | EditTagSuccess
    | ResetSelectedTag
    | ClearLoadedTags;
