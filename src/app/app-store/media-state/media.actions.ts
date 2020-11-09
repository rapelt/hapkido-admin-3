import { Action } from '@ngrx/store';
import { MediaModel } from '../../common/models/media';

export enum ActionTypes {
    Get_all_medias = '[Media] Get all medias',
    Get_all_medias_success = '[Media] Get all medias success',

    Get_media = '[Media] Get media',
    Get_media_success = '[Media] Get media success',

    Clear_loaded_media = '[Media] Clear loaded Medias',

    Add_new_media = '[Media] Add new media',
    Add_new_media_success = '[Media] Add new media success',

    Upload_new_media = '[Media] Upload new media',
    Upload_new_media_success = '[Media] Upload new media success',

    Edit_media = '[Media] Edit media',
    Edit_media_success = '[Media] Edit media success',
}

export class GetAllMedias implements Action {
    readonly type = ActionTypes.Get_all_medias;
}

export class GetAllMediasSuccess implements Action {
    readonly type = ActionTypes.Get_all_medias_success;

    constructor(public payload: MediaModel[]) {}
}

export class ClearMediaLoaded implements Action {
    readonly type = ActionTypes.Clear_loaded_media;
}

export class GetMedia implements Action {
    readonly type = ActionTypes.Get_media;

    constructor(public payload: string) {}
}

export class GetMediaSuccess implements Action {
    readonly type = ActionTypes.Get_media_success;

    constructor(public payload: MediaModel) {}
}

export class AddNewMedia implements Action {
    readonly type = ActionTypes.Add_new_media;

    constructor(public payload: { media: MediaModel; file: any }) {}
}

export class UploadNewMedia implements Action {
    readonly type = ActionTypes.Upload_new_media;

    constructor(public payload: { media: MediaModel; file: any }) {}
}

export class AddNewMediaSuccess implements Action {
    readonly type = ActionTypes.Add_new_media_success;

    constructor(public payload: MediaModel) {}
}

export class UploadNewMediaSuccess implements Action {
    readonly type = ActionTypes.Upload_new_media_success;

    constructor(public payload: MediaModel) {}
}

export class EditMedia implements Action {
    readonly type = ActionTypes.Edit_media;

    constructor(public payload: MediaModel) {}
}

export class EditMediaSuccess implements Action {
    readonly type = ActionTypes.Edit_media_success;

    constructor(public payload: MediaModel) {}
}

export type MediaActions =
    | GetAllMedias
    | GetAllMediasSuccess
    | GetMedia
    | GetMediaSuccess
    | ClearMediaLoaded
    | AddNewMedia
    | UploadNewMedia
    | AddNewMediaSuccess
    | UploadNewMediaSuccess
    | EditMedia
    | EditMediaSuccess;
