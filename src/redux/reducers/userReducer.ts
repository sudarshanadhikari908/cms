import { userActionTypes } from '../types/UserType';

const initialState = {
  users: [],
  errors: null,
  searchTerm: '',
};

export default function users(state = initialState, action: any) {
  switch (action.type) {
    case userActionTypes.GET_USER_DATA_REQUESTED:
      return {
        ...state,
        users: action.payload,
      };
    case userActionTypes.GET_USER_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case userActionTypes.GET_USER_FAILED:
      return {
        ...state,
        errors: action.message,
      };
    case userActionTypes.SET_FILTERED_LIST:
      return {
        ...state,
        searchTerm: action.payload,
      };
    case userActionTypes.SET_PAGINATED_USER_LIST:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return state;
  }
}
