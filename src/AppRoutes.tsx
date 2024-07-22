import React, { lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Dashboard = lazy(() => import('./components/mainLayout/Dashboard'));
const Profile = lazy(() => import('./components/mainLayout/Profile'));

const ResetPassword = lazy(() => import('./pages/auth/PasswordReset'));
const Login = lazy(() => import('./pages/auth/Login'));
const Users = lazy(() => import('./components/mainLayout/Users'));
const UserAdd = lazy(() => import('./components/mainLayout/UserAdd'));
const UserEdit = lazy(() => import('./components/mainLayout/UserEdit'));
const ForgotPassword = lazy(() => import('./pages/auth/forgetPassword'));
const Forbidden = lazy(() => import('./pages/error/403'));
const PageNotFound = lazy(() => import('./pages/error/PageNotFound'));

const Roles = lazy(() => import('./components/mainLayout/Roles'));
const CreateRole = lazy(() => import('./pages/RolesAndPermission/createRole'));
const ViewRole = lazy(() => import('./pages/RolesAndPermission/viewRole'));

const AccountSettings = lazy(() => import('./components/mainLayout/AccountSettings'));
const AuctionManagement = lazy(() => import('./components/mainLayout/AuctionManagement'));
const ViewAuction = lazy(() => import('./pages/AuctionManagement/viewAuction'));
const AuctionForm = lazy(() => import('./components/forms/AuctionForm'));
const AuctionEdit = lazy(() => import('./components/mainLayout/AuctionEdit'));

const EmailTemplate = lazy(() => import('./components/mainLayout/EmailTemplate'));
const EmailEdit = lazy(() => import('./components/mainLayout/EmailEdit'));

const Customers = lazy(() => import('./components/mainLayout/Customers'));
const ViewCustomer = lazy(() => import('./pages/Customers/viewCustomer'));

function AppRoutes() {
  return (
    <BrowserRouter>
      <Switch>
        {/* <Route path="/register" exact component={Register} /> */}
        <Route path="/login" exact component={Login} />
        <Route path="/forgot-password" exact component={ForgotPassword} />
        {/* <Route path="/verify/:token" exact component={VerifyRegister} /> */}
        <Route path="/reset/:token" exact component={ResetPassword} />

        <Route path="/" exact component={Dashboard} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/account-settings" exact component={AccountSettings} />

        <Route path="/users" exact component={Users} />
        <Route path="/users/create" exact component={UserAdd} />
        <Route path="/users/:id/edit" component={UserEdit} />

        <Route path="/auctions" exact component={AuctionManagement} />
        <Route path="/auctions/:id/view" exact component={ViewAuction} />
        <Route path="/auctions/create" exact component={AuctionForm} />
        <Route path="/auctions/:id/edit" exact component={AuctionEdit} />

        <Route path="/email-templates" exact component={EmailTemplate} />
        <Route path="/email-templates/:id/edit" exact component={EmailEdit} />

        <Route path="/customers" exact component={Customers} />
        <Route path="/customers/:id/view" exact component={ViewCustomer} />

        <Route path="/roles-and-permissions" exact component={Roles} />
        <Route path="/roles-and-permissions/create" exact component={CreateRole} />
        <Route path="/roles-and-permissions/:id/edit" exact component={CreateRole} />
        <Route path="/roles-and-permissions/:id/view" exact component={ViewRole} />

        <Route path="/403" exact component={Forbidden} />
        <Route path="*" exact component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default AppRoutes;
