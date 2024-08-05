import {combineReducers} from '@reduxjs/toolkit';

// Slice
import AuthReducer from './AuthRedux/AuthSlice';
import UserReducer from './UserRedux/UserSlice';
import PositionReducer from './PositionRedux/PositionSlice';

const rootReducer = combineReducers({
  auth: AuthReducer,
  user: UserReducer,
  position: PositionReducer,
});

export default rootReducer;
