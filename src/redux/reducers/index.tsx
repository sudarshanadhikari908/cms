import { combineReducers } from 'redux';
import user from './loginReducer';
import users from './userReducer';
import profileReducer from './profileReducer';

const rootReducer = combineReducers({
  users: users,
  user: user,
  profile: profileReducer,
});
export default rootReducer;
