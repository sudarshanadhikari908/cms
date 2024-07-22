import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { authRoutes } from './authRoutes';
import MainLayout from '../components/mainLayout/mainLayout';

function RouteComponent() {
  return (
    <>
      <Suspense fallback={'Loading..'}>
        <Switch>
          {authRoutes}
          <Route component={MainLayout} />
        </Switch>
      </Suspense>
    </>
  );
}

export default RouteComponent;
