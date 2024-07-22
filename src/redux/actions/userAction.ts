import { userActionTypes } from '../types/UserType';

export const setUserList = (data: any) => ({
  type: userActionTypes.GET_USER_DATA_REQUESTED,
  payload: data,
});

export const setUserFilter = (term: string) => ({
  type: userActionTypes.SET_FILTERED_LIST,
  payload: term,
});

export const setPaginatedUser = (users: any) => ({
  type: userActionTypes.SET_PAGINATED_USER_LIST,
  payload: users,
});
