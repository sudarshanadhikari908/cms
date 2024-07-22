import React, { useEffect } from 'react';
import axiosInstance from '../../axios/axios';
import { useHistory, useParams } from 'react-router-dom';

function RegisterVerify() {
  const history = useHistory();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { token }: any = useParams();
  useEffect(() => {
    const registerUser = async () => {
      const response = await axiosInstance.get('/auth/activate-account', { params: { token: token } });
      if (response.status === 200) {
        history.push('/login');
      } else {
        return <div>Invalid token</div>;
      }
    };
    registerUser();
  }, []);

  return <div>Loading...</div>;
}

export default RegisterVerify;
