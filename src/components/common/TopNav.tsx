import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { getProfile } from '../../redux/actions/profileAction';
import axiosInstance from '../../axios/axios';

const TopNav = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    try {
      await axiosInstance.post('/logout');
      window.localStorage.removeItem('isLoggedIn');
      dispatch(getProfile([]));
      window.localStorage.removeItem('profile');
      history.push('/login');
    } catch (e) {
      window.localStorage.removeItem('isLoggedIn');
      dispatch(getProfile([]));
      window.localStorage.removeItem('profile');
      history.push('/login');
    }
  };
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars"></i>
          </a>
        </li>
      </ul>

      {/* <!-- Right navbar links --> */}
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown mr-2">
          <a className="nav-link user-panel profile-link" data-toggle="dropdown" href="#">
            {/* <img src={avatar} alt="Profile" className="img-circle elevation-2 mr-2" /> */}
            <i className="fas fa-user-circle fa-lg mr-1"></i>
            {/* <p className="mr-2">User</p> */}
            <i className="fas fa-caret-down"></i>
          </a>
          <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
            <Link to="/account-settings" className="dropdown-item">
              <i className="fas fa-cog mr-2"></i> Account
            </Link>
            <div className="dropdown-divider"></div>
            <button onClick={logoutHandler} className="dropdown-item">
              <i className="fas fa-sign-out-alt mr-2"></i> Log out
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default TopNav;
