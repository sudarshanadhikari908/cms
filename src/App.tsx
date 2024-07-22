import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getProfile } from './redux/actions/profileAction';
import axiosInstance from './axios/axios';
import './App.scss';
import 'react-toastify/dist/ReactToastify.css';
import AppRoutes from './AppRoutes';

const App: React.FC = () => {
  const dispatch = useDispatch();

  if (window.localStorage.getItem('isLoggedIn') && window.localStorage.getItem('isLoggedIn') === 'true') {
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const res = await axiosInstance.get('/auth/profile');
          dispatch(getProfile(res.data));
        } catch (e) {
          dispatch(getProfile([]));
        }
      };
      fetchProfile();
    }, []);
  }
  return (
    <div className="wrapper">
      <AppRoutes />
    </div>
  );
};

export default App;
