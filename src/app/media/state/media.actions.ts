import { Action } from '@ngrx/store';
import { TechniqueModel } from '../../common/models/technique';
import { TechniqueSetModel } from '../../common/models/technique-set';
import { VideoModel } from '../../common/models/video';
import { PhotoModel } from '../../common/models/photo';

export enum ActionTypes {
    Get_all_videos = '[Media] Get all videos',
    Get_all_videos_success = '[Media] Get all videos success',

    Get_video = '[Media] Get video',
    Get_video_success = '[Media] Get video success',

    Clear_loaded_video = '[Media] Clear loaded Videos',

    Add_new_video = '[Media] Add new video',
    Add_new_video_success = '[Media] Add new video success',

    Edit_video = '[Media] Edit video',
    Edit_video_success = '[Media] Edit video success',

    Get_all_photos = '[Media] Get all photos',
    Get_all_photos_success = '[Media] Get all photos success',

    Get_photo = '[Media] Get all photo sets',
    Get_photo_success = '[Media] Get photo success',

    Clear_loaded_photo = '[Media] Clear loaded Photos',

    Add_new_photo = '[Media] Add new photo',
    Add_new_photo_success = '[Media] Add new photo success',

    Edit_photo = '[Media] Edit photo',
    Edit_photo_success = '[Media] Edit photo success',
}

export class GetAllVideos implements Action {
    readonly type = ActionTypes.Get_all_videos;
}

export class GetAllPhotos implements Action {
    readonly type = ActionTypes.Get_all_photos;
}

export class GetAllVideosSuccess implements Action {
    readonly type = ActionTypes.Get_all_videos_success;

    constructor(public payload: VideoModel[]) {}
}

export class GetAllPhotosSuccess implements Action {
    readonly type = ActionTypes.Get_all_photos_success;

    constructor(public payload: PhotoModel[]) {}
}

export class ClearVideoLoaded implements Action {
    readonly type = ActionTypes.Clear_loaded_video;
}

export class ClearPhotoLoaded implements Action {
    readonly type = ActionTypes.Clear_loaded_photo;
}

export class GetVideo implements Action {
    readonly type = ActionTypes.Get_video;

    constructor(public payload: string) {}
}

export class GetPhoto implements Action {
    readonly type = ActionTypes.Get_photo;

    constructor(public payload: string) {}
}

export class GetVideoSuccess implements Action {
    readonly type = ActionTypes.Get_video_success;

    constructor(public payload: VideoModel) {}
}

export class GetPhotoSuccess implements Action {
    readonly type = ActionTypes.Get_photo_success;

    constructor(public payload: PhotoModel) {}
}

export class AddNewVideo implements Action {
    readonly type = ActionTypes.Add_new_video;

    constructor(public payload: { video: VideoModel; file: any }) {}
}

export class AddNewPhoto implements Action {
    readonly type = ActionTypes.Add_new_photo;

    constructor(public payload: { photo: PhotoModel; file: any }) {}
}

export class AddNewVideoSuccess implements Action {
    readonly type = ActionTypes.Add_new_video_success;

    constructor(public payload: VideoModel) {}
}

export class AddNewPhotoSuccess implements Action {
    readonly type = ActionTypes.Add_new_photo_success;

    constructor(public payload: PhotoModel) {}
}

export class EditVideo implements Action {
    readonly type = ActionTypes.Edit_video;

    constructor(public payload: VideoModel) {}
}

export class EditPhoto implements Action {
    readonly type = ActionTypes.Edit_photo;

    constructor(public payload: PhotoModel) {}
}

export class EditVideoSuccess implements Action {
    readonly type = ActionTypes.Edit_video_success;

    constructor(public payload: VideoModel) {}
}

export class EditPhotoSuccess implements Action {
    readonly type = ActionTypes.Edit_photo_success;

    constructor(public payload: PhotoModel) {}
}

export type MediaActions =
    | GetAllVideos
    | GetAllPhotos
    | GetAllVideosSuccess
    | GetAllPhotosSuccess
    | GetVideo
    | GetPhoto
    | GetVideoSuccess
    | GetPhotoSuccess
    | ClearVideoLoaded
    | ClearPhotoLoaded
    | AddNewVideo
    | AddNewPhoto
    | AddNewVideoSuccess
    | AddNewPhotoSuccess
    | EditVideo
    | EditPhoto
    | EditVideoSuccess
    | EditPhotoSuccess;
