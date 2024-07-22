import { ReactNode } from 'react';
import { Route } from 'react-router';
import { lazy } from 'react';
import { IRouteItem } from '../interface/routes.interface';

export const authRouteList: IRouteItem[] = [
  {
    name: 'Register',
    path: '/register',
    LazyComponent: lazy(() => import('../pages/auth/Register')),
    exact: true,
  },
  {
    name: 'Login',
    path: '/login',
    LazyComponent: lazy(() => import('../pages/auth/Login')),
    exact: true,
  },
];

const routerDom: ReactNode[] = [];
const parseRoutes = (routeList: IRouteItem[]) => {
  routeList.forEach((route, index: number) =>
    routerDom.push(
      // <Route {...route} key={index} children={(props: any) => <route.LazyComponent {...props} route={route} />} />,
      <Route {...route} key={index} />,
    ),
  );
  return routerDom;
};

export const authRoutes = parseRoutes(authRouteList);
