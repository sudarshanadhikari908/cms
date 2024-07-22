import * as profileActionTypes from '../types/ProfileType';

const initialState = {
  profile: [],
  error: [],
};

export default function profileReducer(state = initialState, action: any) {
  switch (action.type) {
    case profileActionTypes.GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
      };
    default:
      return state;
  }
}
