import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';

import Layout from '../../pages/Layout';
import ContentHeader from '../common/ContentHeader';
import ComponentLayout from '../common/ComponentLayout';

function Dashboard() {
  if (!window.localStorage.getItem('isLoggedIn') || window.localStorage.getItem('isLoggedIn') !== 'true') {
    <Redirect to="/login" />;
  }
  return (
    <Layout>
      <ContentHeader title="" needCreateBtn={false} createUrl="" />
      <ComponentLayout>
        <div className="card error-card centered">
          <div className="card-body">
            <h2 className="headline text-danger">403</h2>

            <div className="error-content">
              <h4>
                <i className="fas fa-exclamation-triangle text-danger"></i> Permission Denied.
              </h4>
              <Link className="btn btn-primary" to={'/'}>
                Go to Dashboard
              </Link>
            </div>
          </div>
        </div>
      </ComponentLayout>
    </Layout>
  );
}

export default Dashboard;
