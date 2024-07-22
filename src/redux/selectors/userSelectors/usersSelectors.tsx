import { createSelector } from 'reselect';
import { filteredData } from '../../utils/usersUtils';

export const UsersListSelector = (state: any) => state.users;

export const selectUsers = createSelector([UsersListSelector], (users) => users.users);

export const selectFilteredList = createSelector([UsersListSelector], (users) =>
  filteredData(users.users, users.searchTerm),
);
