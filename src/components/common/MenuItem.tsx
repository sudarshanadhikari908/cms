import { useState } from 'react';
import { Link } from 'react-router-dom';
import { selectProfile } from '../../redux/selectors/profileSelectors/profileSelectors';
import { useSelector } from 'react-redux';
import { checkPermissions } from '../../utils/checkPermissions';

const MenuItem = (props: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const profile = useSelector(selectProfile);

  const showDropdownMenu = () => {
    const showMainModule = props.module?.subModules?.some((subModule: any) => {
      const check = checkPermissions(profile, subModule.resource === 'role' ? '/roles' : subModule?.route, 'get');
      return check;
    });
    return showMainModule;
  };

  return (
    <li className={`nav-item ${props.module.hasSubmodules && isOpen ? 'menu-open' : 'menu-close'}`}>
      {showDropdownMenu() || props.module.resource === 'dashboard' ? (
        <Link
          to={props.module.hasSubmodules ? '#' : `${props.module.route}`}
          className="nav-link"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className={props.module?.icon + ' nav-icon'}></i>
          <p>
            {props.module.name}
            {props.module.hasSubmodules && <i className="right fas fa-angle-left"></i>}
          </p>
        </Link>
      ) : (
        checkPermissions(profile, props.module.route, 'get') && (
          <Link
            to={props.module.hasSubmodules ? '#' : `${props.module.route}`}
            className="nav-link"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className={props.module?.icon + ' nav-icon'}></i>
            <p>
              {props.module.name}
              {props.module.hasSubmodules && <i className="right fas fa-angle-left"></i>}
            </p>
          </Link>
        )
      )}

      {props.module.hasSubmodules && (
        <ul className="nav nav-treeview">
          {props.module.subModules &&
            props.module.subModules.map((subModule: any, index: any) => {
              return (
                checkPermissions(profile, subModule.resource === 'role' ? '/roles' : subModule?.route, 'get') && (
                  <li className="nav-item" key={index}>
                    <Link to={`${subModule?.route}`} className="nav-link active">
                      <i className={subModule?.icon + ' fas mr-2'}></i>
                      <p>{subModule?.name}</p>
                    </Link>
                  </li>
                )
              );
            })}
        </ul>
      )}
    </li>
  );
};

export default MenuItem;
