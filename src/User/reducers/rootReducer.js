import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import otherReducer from './otherReducer';

const rootReducer = combineReducers({
  user: userReducer,
  other: otherReducer,
});

export default rootReducer;