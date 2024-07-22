import { ReactNode } from 'react';
import { Route } from 'react-router';
// import { Role } from "../enum/enum";
import { lazy } from 'react';

export const mainRoutesList: any = [];

const routerDom: ReactNode[] = [];
const parseRoutes = (routeList: any) => {
  routeList.forEach((route: any, index: number) =>
    routerDom.push(
      // eslint-disable-next-line react/no-children-prop
      <Route {...route} key={index} children={(props: any) => <route.LazyComponent {...props} route={route} />} />,
    ),
  );
  return routerDom;
};
export const mainRoutes = parseRoutes(mainRoutesList);
