import axios from "axios";
import {
  LOGIN_USER,
  SIGNUP_USER,
  UPDATE_USER,
  LOGOUT_USER,
  SET_USER_DATA,
} from "./Types";

// 로그인 액션
export function loginUser(dataToSubmit) {
  return (dispatch) => {
    return axios
      .post("/users/login", dataToSubmit)
      .then((response) => {
        const { token } = response.data;
        localStorage.setItem("token", token); // 토큰 저장

        dispatch({
          type: LOGIN_USER,
          payload: response.data,
        });
        return response.data;
      })
      .catch((error) => {
        console.error("Login Error", error);
        throw error;
      });
  };
}

// 회원가입 액션
export function SignuprUser(dataToSubmit) {
  return (dispatch) => {
    return axios
      .post("/users/signup", dataToSubmit)
      .then((response) => {
        console.log("Signup response", response.data); // Log the response
        dispatch({
          type: SIGNUP_USER,
          payload: response.data,
        });
        return response.data;
      })
      .catch((error) => {
        console.error("Signup Error", error);
        throw error;
      });
  };
}

export function UpdateUser(dataToSubmit, userAccount, token) {
  return (dispatch) => {
    return axios
      .put(`/users/${userAccount}`, dataToSubmit, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // 요청 성공 시
        console.log("Update response", response.data); // 로그
        dispatch({
          type: UPDATE_USER,
          payload: response.data,
        });
        return response.data;
      })
      .catch((error) => {
        // 요청 실패 시
        console.error("Update Error", error);
        // 필요에 따라 오류 처리를 위한 액션을 디스패치할 수 있음
        throw error;
      });
  };
}

// 로그아웃 액션
export function logoutUser() {
  return (dispatch) => {
    return axios
      .post("/users/logout")
      .then((response) => {
        dispatch({
          type: LOGOUT_USER,
          payload: response.data,
        });
        return response.data;
      })
      .catch((error) => {
        console.error("Logout Error", error);
        throw error;
      });
  };
}

export function setUserData(userData) {
  return {
    type: SET_USER_DATA,
    payload: userData,
  };
}
