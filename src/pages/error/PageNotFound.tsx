import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div className="page-not-found">
      <div className="card error-card centered">
        <div className="card-body">
          <h2 className="headline text-danger">404</h2>

          <div className="error-content">
            <h4>
              <i className="fas fa-exclamation-triangle text-danger"></i> Sorry, the requested page could not be found.
            </h4>
            <Link className="btn btn-primary mt-3" to={'/'}>
              Go to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
