import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { kakaoLogin } from "./KakaoLogin";

const OAuth2RedirectHandler = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    if (code) {
      dispatch(kakaoLogin(code, navigate));
    }
  }, [code, dispatch, navigate]);

  return <div>카카오 로그인 처리 중...</div>;
};

export default OAuth2RedirectHandler;
