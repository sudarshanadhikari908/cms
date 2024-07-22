import { Redirect } from 'react-router-dom';

import ResetPassword from '../../components/auth/ResetPassword';

function PassswordReset() {
  if (window.localStorage.getItem('isLoggedIn')) {
    return <Redirect to="/" />;
  }
  return <ResetPassword />;
}

export default PassswordReset;
