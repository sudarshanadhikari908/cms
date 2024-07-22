import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import axiosInstance from '../../axios/axios';
import Layout from '../../pages/Layout';
import ComponentLayout from '../common/ComponentLayout';
import EditAccountSettings from '../forms/EditAccountSettings';
import ResetPasswordAccount from '../forms/ResetPasswordAccount';

function AccountSettings() {
  const [reload, setReload] = useState<boolean>(true);
  const [editCancel, setEditCancel] = useState<boolean>(false);
  const [role, setRole] = useState();
  const [profile, setProfile] = useState<any>();
  const [title, setTitle] = useState<string>('');
  const [dangerBtn, setDangerBtn] = useState<string>('');
  const [successBtn, setSuccessBtn] = useState<string>('');
  const [modalToggle, setModalToggle] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState();
  const [contact, setContact] = useState<number>();
  const [serverErrors, setServerErrors] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordResetServerErrors, setPasswordResetServerErrors] = useState<any>([]);

  const handleEditSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      await axiosInstance.put('/auth/profile', {
        firstName: values.fname.trim(),
        lastName: values.lname.trim(),
        contact: values.contact ? values.contact.toString() : '',
      });
      setServerErrors([]);
      toast.success('Profile updated successfully!');
      handleModalToggle();
      setIsLoading(false);
    } catch (e: any) {
      if (e.response.status === 422) {
        setServerErrors(e?.response?.data?.message);
      }
      setIsLoading(false);
    }
    setReload(!reload);
  };

  const cancelEdit = () => {
    setEditCancel(!editCancel);
  };

  const handlePasswordReset = async (values: any) => {
    setIsLoading(true);
    try {
      await axiosInstance.put('/auth/change-password', {
        oldPassword: values.oldPassword,
        password: values.password,
        confirmPassword: values.confirmPassword,
      });
      setPasswordResetServerErrors([]);
      toast.success('Password successfully changed.');
      setIsLoading(false);
      handleModalToggle();
    } catch (e: any) {
      if (e.response.status === 412) {
        setPasswordResetServerErrors([{ name: 'oldPassword', errors: [e.response.data.message] }]);
      }
      if (e.response.status === 422) {
        setPasswordResetServerErrors(e?.response?.data?.message);
      }
      setIsLoading(false);
    }
  };

  const handleModalToggle = () => {
    setModalToggle(!modalToggle);
  };
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get('/auth/profile');
        if (res) {
          setFirstName(res?.data?.firstName);
          setLastName(res?.data?.lastName);
          setEmail(res?.data?.email);
          setContact(res?.data?.contact);
          setRole(res?.data?.role?.name);
          setProfile(res.data);
        }
      } catch (e: any) {
        console.log(e);
      }
    };
    fetchProfile();
  }, [reload, editCancel]);
  return (
    <Layout>
      <ComponentLayout>
        <ToastContainer />
        <div className="d-flex justify-content-between align-items-center py-4">
          <div className="content-header p-0">
            <h1 className="m-0 font-weight-bold">Account</h1>
          </div>

          <div className="account-btn d-flex justify-content-end">
            <Button
              variant="primary"
              type="submit"
              className="account-edit-btn mr-3 mb-3"
              onClick={() => {
                setTitle('Edit Profile');
                handleModalToggle();
                setSuccessBtn('Update');
                setDangerBtn('Cancel');
              }}
            >
              Edit Profile
            </Button>
            <Button
              variant="primary"
              type="submit"
              className="mb-3"
              onClick={() => {
                setTitle('Reset Password');
                handleModalToggle();
                setSuccessBtn('Update');
                setDangerBtn('Cancel');
              }}
            >
              Change Password
            </Button>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-lg-12">
                {title === 'Edit Profile' && profile && (
                  <>
                    <EditAccountSettings
                      fname={firstName.trim()}
                      lname={lastName.trim()}
                      email={email}
                      contact={contact}
                      handleEditSubmit={handleEditSubmit}
                      handleModalToggle={handleModalToggle}
                      setServerErrors={setServerErrors}
                      dangerBtn={dangerBtn}
                      successBtn={successBtn}
                      modalToggle={modalToggle}
                      loading={isLoading}
                      serverErrors={serverErrors}
                      cancelEdit={cancelEdit}
                    />
                  </>
                )}
                {title === 'Reset Password' && (
                  <>
                    <ResetPasswordAccount
                      handlePasswordReset={handlePasswordReset}
                      modalToggle={modalToggle}
                      dangerBtn={dangerBtn}
                      successBtn={successBtn}
                      handleModalToggle={handleModalToggle}
                      loading={isLoading}
                      passwordResetServerErrors={passwordResetServerErrors}
                      setPasswordResetServerErrors={setPasswordResetServerErrors}
                    />
                  </>
                )}
                {profile && (
                  <>
                    <table className="table system-table text-nowrap w-100">
                      <tbody>
                        <tr>
                          <th className="th-acc">Name </th>
                          <td>
                            {firstName} {lastName}
                          </td>
                        </tr>
                        <tr>
                          <th className="th-acc">Email Address</th>
                          <td>{email}</td>
                        </tr>
                        <tr>
                          <th className="th-acc">Phone Number </th>
                          <td>{contact ? contact : '-'}</td>
                        </tr>
                        <tr>
                          <th className="th-acc">Role</th>
                          <td>{role}</td>
                        </tr>
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </ComponentLayout>
    </Layout>
  );
}

export default AccountSettings;
