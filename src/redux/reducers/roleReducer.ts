import { rolesActionTypes } from '../types/RolesType';

const intitalState = {
  roles: [],
};

export default function roles(state = intitalState, action: any) {
  switch (action.type) {
    case rolesActionTypes.GET_ROLES_SUCCESS:
      return {
        ...state,
        roles: action.payload,
      };
    default:
      return state;
  }
}
