export const splitName = (profile: any) => {
  const profileData = { ...profile };
  const [fname, lname] = profileData.name.split(' ');
  return {
    name: profileData.name,
    firstName: fname,
    lastName: lname,
    email: profileData.email,
    contact: profileData.contact,
    role: profileData.role,
  };
};
