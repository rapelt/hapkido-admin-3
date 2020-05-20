import { FamilyModel } from '../../common/models/family.model';
import { ActionTypes, TagsActions } from './tags.actions';
import * as _ from 'underscore';
import { TagModel } from '../../common/models/tag';

export const TECHNIQUES_FEATURE_NAME = 'tags';

export interface TagsState {
    tags: TagModel[];
    selectedTag: any;
    loaded: boolean;
}

const initialState: TagsState = {
    tags: [],
    selectedTag: null,
    loaded: false,
};

export function tagsReducer(state = initialState, action: TagsActions) {
    switch (action.type) {
        case ActionTypes.Get_all_tags_success:
            return {
                ...state,
                tags: action.payload,
                loaded: true,
            };
        case ActionTypes.Add_new_tag_success:
            return {
                ...state,
                tags: [...state.tags, action.payload],
            };
        case ActionTypes.Edit_tag_success:
            console.log(action.payload);
            const editedTag = {
                ...action.payload,
            };
            const editTagIndex = state.tags.findIndex(s => {
                return s.id === action.payload.id;
            });

            const editTagsList = [...state.tags];
            editTagsList[editTagIndex] = editedTag;

            return {
                ...state,
                tags: editTagsList,
                selectedTag: editedTag,
            };
        case ActionTypes.Set_selected_tag:
            const tag = state.tags.find(s => {
                return s.id === action.payload;
            });
            return {
                ...state,
                selectedTag: tag,
            };
        case ActionTypes.Reset_selected_tag:
            return {
                ...state,
                selectedTag: null,
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

function getIndexOfTag(tags: TagModel[], hbId: string): number {
    return _.findIndex(tags, { hbId: hbId });
}
