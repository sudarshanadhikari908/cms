import { rolesActionTypes } from '../types/RolesType';

export const getRoles = (payload: any) => ({
  type: rolesActionTypes.GET_ROLES_SUCCESS,
  payload: payload,
});
