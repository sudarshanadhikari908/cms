import { combineReducers } from 'redux';
import user from './loginReducer';
import users from './userReducer';
import roles from './roleReducer';
import profileReducer from './profileReducer';
import AuctionManagementSlice from '../slice/AuctionManagementSlice';
import EmailTemplateSlice from '../slice/EmailTemplateSlice';
import CustomerSlice from '../slice/CustomerSlice';
import DashBoardSlice from '../slice/DashBoardSlice';

const rootReducer = combineReducers({
  users: users,
  user: user,
  roles: roles,
  profile: profileReducer,
  auction: AuctionManagementSlice,
  emailReducer: EmailTemplateSlice,
  customerReducer: CustomerSlice,
  dashBoardReducer: DashBoardSlice,
});

export default rootReducer;
