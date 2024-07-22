import { Redirect } from 'react-router-dom';

const ComponentLayout = (props: { children: any }) => {
  if (!window.localStorage.getItem('isLoggedIn')) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="content">
      <div className="container-fluid">{props.children}</div>
    </div>
  );
};

export default ComponentLayout;
