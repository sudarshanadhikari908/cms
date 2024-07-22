import { createSelector } from 'reselect';

export const RolesSelector = (state: any) => state.roles;

export const selectRoles = createSelector([RolesSelector], (roles) => roles.roles);
