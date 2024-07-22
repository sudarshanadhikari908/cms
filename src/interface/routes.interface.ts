import { RouteProps } from 'react-router-dom';

export interface IRouteItem extends RouteProps {
  name: string;
  path: string;
  exact?: boolean;
  LazyComponent?: any;
  icons?: React.ReactNode;
}
