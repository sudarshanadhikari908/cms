import React, { Suspense } from 'react';
import { Switch } from 'react-router';

import { mainRoutes } from '../../routes/main.routes';

function mainLayout() {
  return (
    <Suspense fallback="Loading..">
      <Switch>{mainRoutes}</Switch>
    </Suspense>
  );
}

export default mainLayout;
