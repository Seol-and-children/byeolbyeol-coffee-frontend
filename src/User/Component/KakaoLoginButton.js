import React from "react";
import KakaoLoginImage from "../../assets/kakao_login_button.png";
import styles from "./KakaoLoginButton.module.css";

const CLIENT_ID = "99902aa48e763fcf38fec71b9dbb33d2";
const REDIRECT_URL = "http://localhost:3000/login/oauth/kakao/callback";

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=code`;

const KakaoLoginButton = ({ href }) => {
  return (
    <a href={href} className={styles.kakaologinbutton}>
      <img src={KakaoLoginImage} alt="카카오 로그인" />
    </a>
  );
};

export default KakaoLoginButton;
