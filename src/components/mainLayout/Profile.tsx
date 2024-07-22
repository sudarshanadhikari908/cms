import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getProfile } from '../../redux/actions/profileAction';
import axiosInstance from '../../axios/axios';
import Layout from '../../pages/Layout';
import ContentHeader from '../common/ContentHeader';
import ComponentLayout from '../common/ComponentLayout';
import { IUserInterface } from '../../interface/user.interface';

function Profile() {
  const [profile, setProfile] = useState<IUserInterface>();
  const dispatch = useDispatch();

  if (!window.localStorage.getItem('isLoggedIn') || window.localStorage.getItem('isLoggedIn') !== 'true') {
    <Redirect to="/login" />;
  }

  useEffect(() => {
    const getUser = async () => {
      const res = await axiosInstance.get('/auth/profile');
      if (res.status === 200) {
        setProfile(res.data);
        dispatch(getProfile(res.data));
        window.localStorage.setItem('profile', JSON.stringify(res.data));
      } else {
        // check for otp required error
      }
    };
    getUser();
  }, []);

  return (
    <Layout>
      <ContentHeader title="Profile" needCreateBtn={false} createUrl="" />
      <ComponentLayout>
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-4">
                    <span>
                      Name: {profile?.firstName} {profile?.lastName}
                    </span>
                  </div>
                  <div className="col-sm-4">
                    <span>Email: {profile?.email}</span>
                  </div>
                  <div className="col-sm-4">
                    <span>Contact: {profile?.contact}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ComponentLayout>
    </Layout>
  );
}

export default Profile;
