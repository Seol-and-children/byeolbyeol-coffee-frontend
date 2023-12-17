import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate(); 
  const code = new URL(window.location.href).searchParams.get('code'); 

  useEffect(() => {
    if (code) {
      axios.get(`http://localhost:8080/login/oauth/kakao/callback?code=${code}`)
        .then(res => {
          console.log("받아오는겨? :", res);
          const ACCESS_TOKEN = res.data.accessToken;
          //const KakaoNickName = res.data.KakaoNickName;
          localStorage.setItem("token", ACCESS_TOKEN);
          navigate("/main");
        })
        .catch(err => {
          console.log("로그인 에러", err);
          window.alert("로그인에 실패하였습니다.");
          navigate("/users/login"); 
        });
    }
  }, [code, navigate]);

  return <div>로그인 처리 중...</div>;
};

export default OAuth2RedirectHandler;
