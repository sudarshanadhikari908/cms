import * as profileActionTypes from '../types/ProfileType';
export const getProfile = (data: any) => ({
  type: profileActionTypes.GET_PROFILE_SUCCESS,
  payload: data,
});
