export const filteredData = (users: any, searchTerm: string) => {
  let newSearchList = [...users];

  if (searchTerm !== '') {
    newSearchList = newSearchList.filter(
      ({ email, name }) =>
        email.toLowerCase().includes(searchTerm.toLowerCase()) || name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }
  return newSearchList;
};
