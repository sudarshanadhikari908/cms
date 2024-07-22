import { loginActionTypes } from '../types/LoginType';

const initialState = {
  user: [],
  isLoggedIn: false,
  error: null,
};

export default function user(state = initialState, action: any) {
  switch (action.type) {
    case loginActionTypes.GET_USER_REQUESTED:
      return {
        ...state,
        isLoggedIn: false,
      };
    case loginActionTypes.SET_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        error: null,
      };
    case loginActionTypes.SET_LOGIN_FAILED:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        error: action.message,
      };
    default:
      return state;
  }
}
