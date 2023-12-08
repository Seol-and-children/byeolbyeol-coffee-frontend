const kakaoLogin = (code) => {
    return function (dispatch, getState, { history }) {
      axios({
        method: "GET",
        url: `http://3.35.208.142/login/oauth/kakao/callback?code=${code}`,
      })
      .then((res) => {
        console.log(res);
  
        const ACCESS_TOKEN = res.data.accessToken;
  
        localStorage.setItem("token", ACCESS_TOKEN);
  
        history.replace("/main");
      })
      .catch((err) => {
        console.log("소셜로그인 에러", err);
        window.alert("로그인에 실패하였습니다.");
        history.replace("/login");
      });
    };
  };