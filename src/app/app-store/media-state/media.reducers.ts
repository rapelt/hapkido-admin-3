import { ActionTypes, MediaActions } from './media.actions';
import { MediaModel } from '../../common/models/media';

export const MEDIA_FEATURE_NAME = 'media';

export interface MediaState {
    medias: MediaModel[];
    mediasLoaded: boolean;
}

const initialState: MediaState = {
    medias: [],
    mediasLoaded: false,
};

export function mediaReducer(state = initialState, action: MediaActions) {
    switch (action.type) {
        case ActionTypes.Get_all_medias_success:
            return {
                ...state,
                medias: action.payload,
                mediasLoaded: true,
            };
        // case ActionTypes.Upload_new_media_success:
        //     return {
        //         ...technique-tags-student-media-classes-auth-state,
        //         medias: action.payload,
        //         mediasLoaded: true,
        //     };
        default:
            return state;
    }
}
