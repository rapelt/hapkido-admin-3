import { ActionTypes, MediaActions } from './media.actions';
import { PhotoModel } from '../../common/models/photo';
import { VideoModel } from '../../common/models/video';

export const MEDIA_FEATURE_NAME = 'media';

export interface MediaState {
    photos: PhotoModel[];
    videos: VideoModel[];
    photosLoaded: boolean;
    videosLoaded: boolean;
}

const initialState: MediaState = {
    photos: [],
    videos: [],
    photosLoaded: false,
    videosLoaded: false,
};

export function mediaReducer(state = initialState, action: MediaActions) {
    switch (action.type) {
        case ActionTypes.Get_all_videos_success:
            return {
                ...state,
                videos: action.payload,
                videosLoaded: true,
            };
        // case ActionTypes.Upload_new_video_success:
        //     return {
        //         ...state,
        //         videos: action.payload,
        //         videosLoaded: true,
        //     };
        case ActionTypes.Get_all_photos_success:
            return {
                ...state,
                photos: action.payload,
                photosLoaded: true,
            };
        default:
            return state;
    }
}

// function getIndexOfTechnique(
//     techniques: TechniqueModel[],
//     hbId: string
// ): number {
//     return _.findIndex(techniques, { hbId: hbId });
// }
