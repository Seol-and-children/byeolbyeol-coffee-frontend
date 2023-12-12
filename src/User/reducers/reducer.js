import { combineReducers } from "redux";
import user from '../reducers/UserReducer';

const rootReducer = combineReducers({
    user, 
})

export default rootReducer;
