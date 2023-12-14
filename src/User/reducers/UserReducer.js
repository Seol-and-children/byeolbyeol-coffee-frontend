import {
  LOGIN_USER,
  SIGNUP_USER,
  UPDATE_USER,
  LOGOUT_USER,
  SET_USER,
  SET_USER_DATA,
  DELETE_USER,
  UPDATE_USER_BIO
} from "../component/Types";

const initialState = {
  userData: null,
  // 기타 초기 상태 값들...
};


export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload.success, userData: action.payload.data, };
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
    case DELETE_USER:
      return { ...state,userData: null,};
    case UPDATE_USER_BIO:
      console.log("리듀서에서 처리 중인 상태:", state);
      console.log("리듀서에서 처리 중인 액션 데이터:", action.payload);
      return {  ...state, userData: {...state.userData, userBio: action.payload.data.userBio}};    
    default:
      return state;
  }
}
