import axios from 'axios';

export const kakaoLogin = (code, navigate) => {
  return function (dispatch) {
    axios({
      method: "GET",
      url: `http://127.0.0.1/login/oauth/kakao/callback?code=${code}`,
    })
    .then((res) => {
      console.log(res);

      const ACCESS_TOKEN = res.data.accessToken;
      localStorage.setItem("token", ACCESS_TOKEN);

      navigate("/main");
    })
    .catch((err) => {
      console.log("소셜로그인 에러", err);
      console.log("Response data:", err.response.data);
      console.log("Response status:", err.response.status);
      window.alert("로그인에 실패하였습니다.");
      navigate("/users/login");
    });
  };
};
