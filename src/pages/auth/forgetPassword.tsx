import { Redirect } from 'react-router-dom';

import ForgetPassword from '../../components/auth/ForgetPassword';

function forgetPassword() {
  if (window.localStorage.getItem('isLoggedIn')) {
    return <Redirect to="/" />;
  }
  return <ForgetPassword />;
}

export default forgetPassword;
