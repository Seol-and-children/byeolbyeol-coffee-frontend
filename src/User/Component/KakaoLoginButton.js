import React from "react";
import KakaoLoginImage from "../../assets/kakao_login_button.png";
import styles from "./KakaoLoginButton.module.css";
import { KAKAO_AUTH_URL } from "../../config/config";

const KakaoLoginButton = () => {
  return (
    <a href={KAKAO_AUTH_URL} className={styles.kakaologinbutton}>
      <img src={KakaoLoginImage} alt="카카오 로그인" />
    </a>
  );
};

export default KakaoLoginButton;
