import axios from "axios";

export const kakaoLogin = (code, navigate) => {
  return function (dispatch) {
    axios({
      method: "GET",
      url: `http://58.121.108.52/login/oauth/kakao/callback?code=${code}`,
    })
      .then((res) => {
        console.log(res);

        const ACCESS_TOKEN = res.data.accessToken;
        localStorage.setItem("token", ACCESS_TOKEN);

        navigate("/main");
      })
      .catch((err) => {
        console.log("소셜로그인 에러", err);
        window.alert("로그인에 실패하였습니다.");
        navigate("/users/login");
      });
  };
};
