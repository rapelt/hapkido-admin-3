import { ActionTypes, ClassesActions } from './classes.actions';

export const CLASSES_FEATURE_NAME = 'classes';

export interface ClassesState {
  classes: Array<any>;
  selectedClass: any;
}

const initialState: ClassesState = {
  classes: [],
  selectedClass: null,
};

export function classesReducer(state = initialState, action: ClassesActions) {
  switch (action.type) {
    case ActionTypes.Get_all_classes_success:
      return {
        ...state,
        classes: action.payload
      };
    default:
      return state;
  }
}


