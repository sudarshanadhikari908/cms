import { Redirect } from 'react-router-dom';

import LoginAccount from '../../components/auth/Login';

function Login() {
  if (window.localStorage.getItem('isLoggedIn')) {
    return <Redirect to="/" />;
  }
  return <LoginAccount />;
}

export default Login;
