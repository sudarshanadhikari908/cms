import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import axiosInstance from '../../axios/axios';
import { selectUsers } from '../../redux/selectors/userSelectors/usersSelectors';
import UserEditForm from '../forms/UserEditForm';

function UserEdit() {
  const users = useSelector(selectUsers);
  const { id } = useParams<any>();
  const [user, setUser] = useState();

  useEffect(() => {
    if (id) {
      const fetchUserById = async () => {
        try {
          const res = await axiosInstance.get(`/users/${id}`);
          setUser(res.data);
        } catch (e) {
          // GO to page not found
          console.log('GO to page not found');
        }
      };
      fetchUserById();
    }
  }, [users]);

  return (
    <>
      {user && (
        <>
          <UserEditForm id={id} title={'User / Edit User'} user={user} />
        </>
      )}
    </>
  );
}

export default UserEdit;
