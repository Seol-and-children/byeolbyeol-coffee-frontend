import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OAuth2RedirectHandler = () => {
  const navigate = useNavigate(); // useNavigate를 컴포넌트 최상단에서 호출
  const code = new URL(window.location.href).searchParams.get('code'); // URL에서 code 추출

  useEffect(() => {
    if (code) {
      axios.get(`/login/oauth/kakao/callback?code=${code}`) // 백엔드 URL 확인 필요
        .then(res => {
          console.log(res);
          const ACCESS_TOKEN = res.data.accessToken;
          localStorage.setItem("token", ACCESS_TOKEN);
          navigate("/main");
        })
        .catch(err => {
          console.log("로그인 에러", err);
          window.alert("로그인에 실패하였습니다.");
          navigate("/users/login"); // 실패 시 로그인 페이지로 이동
        });
    }
  }, [code, navigate]); // useEffect 의존성 배열에 code와 navigate 추가

  return <div>로그인 처리 중...</div>;
};

export default OAuth2RedirectHandler;
