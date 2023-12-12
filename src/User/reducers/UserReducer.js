import {
  LOGIN_USER,
  SIGNUP_USER,
  UPDATE_USER,
  LOGOUT_USER,
  SET_USER,
  SET_USER_DATA,
} from "../Component/types";

export default function UserReducer(state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginSuccess: action.payload.success,
        userData: action.payload.data,
      };
    case SIGNUP_USER:
      return { ...state, signup: action.payload };
    case UPDATE_USER:
      return { ...state, updateSuccess: action.payload };
    case LOGOUT_USER:
      return { ...state, userData: null };
    case SET_USER:
      return { ...state, userData: action.payload };
    case SET_USER_DATA:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
}
