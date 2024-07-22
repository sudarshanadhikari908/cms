import { Link } from 'react-router-dom';

import PermissionConfiguration from '../../config/cmsConfig';
import MenuItem from './MenuItem';
import logo from '../../assets/images/avalon-small.jpg';

const SideBar = () => {
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      <Link to="/" className="brand-link d-flex justify-content-center">
        <img src={logo} alt="Avalon" className="brand-image" />
        <span className="brand-text text-dark font-weight-semibold">Avalon</span>
      </Link>

      <div className="sidebar">
        <nav className="mt-4">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {PermissionConfiguration.modules.map((module, index) => {
              return <MenuItem key={index} module={module} />;
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default SideBar;
