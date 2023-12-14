import axios from "axios";
import {
  LOGIN_USER,
  SIGNUP_USER,
  UPDATE_USER,
  LOGOUT_USER,
  SET_USER_DATA,
  DELETE_USER,
  UPDATE_USER_BIO,
} from "./Types";


export function loginUser(dataToSubmit) {
  return (dispatch) => {
    return axios
      .post("/users/login", dataToSubmit)
      .then((response) => {
        console.log("서버로부터의 로그인 응답:", response.data);

        const userData = {
          accessToken: response.data.data.accessToken,
          userId: response.data.data.userId,
          userNickName: response.data.data.userNickName,
          userAccount: response.data.data.userAccount,
          userRole: response.data.data.userRole,
          userBio: response.data.data.userBio,
        };

        if (userData) {
          sessionStorage.setItem('userData', JSON.stringify(userData));
          console.log("로그인 후 세션 스토리지에 저장된 데이터:", userData);
          dispatch({
            type: LOGIN_USER,
            payload: response.data,
          });
        } else {
          console.error("서버 응답에서 accessToken을 찾을 수 없음");
        }
        return response.data;
      })
      .catch((error) => {
        console.error("Login Error", error);
        throw error;
      });
  };
}

export function SignuprUser(dataToSubmit) {
  return (dispatch) => {
    return axios
      .post("/users/signup", dataToSubmit)
      .then((response) => {
        console.log("Signup response", response.data); 
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
        console.log("Update response", response.data);
        dispatch({
          type: UPDATE_USER,
          payload: response.data,
        });
        return response.data;
      })
      .catch((error) => {
        console.error("Update Error", error);
        throw error;
      });
  };
}

export function logoutUser() {
  return (dispatch) => {
    return axios
      .post("/users/logout")
      .then((response) => {
        sessionStorage.removeItem('userData');
        console.log("로그아웃 액션: 세션 스토리지에서 토큰 제거");
        dispatch({
          type: LOGOUT_USER,
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

export function deleteUser(userAccount, token) {
  return (dispatch) => {
    return axios
      .delete(`/users/${userAccount}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("Delete response", response.data);
        dispatch({
          type: DELETE_USER,
          payload: null, // 회원 탈퇴 후 사용자 데이터는 null로 설정
        });
        return response.data;
      })
      .catch((error) => {
        console.error("Delete Error", error);
        throw error;
      });
  };
}

export const updateUserBio = (userAccount, userBio) => {
  return (dispatch) => {
      return axios.put(`/users/${userAccount}/bio` , userBio, {
        headers: {
          'Content-Type': 'text/plain'
        }
      })
      .then(response => {
        console.log("서버로부터의 응답:", response.data);
        console.log("서버에서 받은 userBio 데이터:", response.data.data.userBio);
        dispatch({
            type: UPDATE_USER_BIO,
            payload: response.data
        });
    })
          .catch(error => {
              console.error('자기소개 업데이트 오류', error);
              throw error;
          });
  };
};
