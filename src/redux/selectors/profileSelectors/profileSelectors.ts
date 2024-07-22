import { createSelector } from 'reselect';

export const ProfileSelector = (state: any) => state.profile;

export const selectProfile = createSelector([ProfileSelector], (profile) => profile.profile);
