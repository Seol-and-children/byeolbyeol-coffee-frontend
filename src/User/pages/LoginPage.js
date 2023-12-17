import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../component/UserAction";
import styles from './LoginPage.module.css';
import KakaoLoginButton from "../component/KakaoLoginButton";
import { KAKAO_AUTH_URL } from "../../config/config";
import logo from "../../assets/logo.png";

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userAccount, setAccount] = useState("");
  const [userPassword, setPassword] = useState("");

  let sessionStorage = window.sessionStorage;

  const onAccountHandler = (event) => {
    setAccount(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();

    console.log("Account", userAccount);
    console.log("Password", userPassword);

    let body = {
      userAccount: userAccount,
      userPassword: userPassword,
    };

    dispatch(loginUser(body))
      .then((response) => {
        console.log(response); 
        if (response.success) {
          const userNickName = response.data.userNickName;
           const userData = {
            accessToken: response.data.accessToken,
            userId: response.data.userId,
            userNickName: userNickName,
            userAccount: response.data.userAccount,
            userRole: response.data.userRole,
            userBio: response.data.userBio,
          };

          sessionStorage.setItem("userData", JSON.stringify(userData));
          sessionStorage.setItem("token", response.data.accessToken);
          sessionStorage.setItem('userId', response.data.userId)
          alert(`${userData.userNickName}님 로그인 되었습니다`);
          navigate("/main");
  
      } else {
          alert("아이디 또는 비밀번호가 틀렸습니다");
        }
      })
      .catch((error) => {
        console.error("Login Error", error);
        alert("로그인 중 오류가 발생했습니다");
      });
  };

  return (
    <div className={styles.body}>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <div className={styles.blank}>
          <img className={styles.logo} src={logo} alt="별별커피 로고" />
        </div>
        <div className={styles.inputDiv}>
        <label className={`${styles.labelWithImage} ${styles.account}`}></label>
          <input
            type="text"
            value={userAccount}
            onChange={onAccountHandler}
            placeholder="아이디를 입력하세요"
          />
        </div>
        <div className={styles.inputDiv}>
        <label className={`${styles.labelWithImage} ${styles.password}`}></label>
          <input
            type="password"
            value={userPassword}
            onChange={onPasswordHandler}
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <br />
        <button className={styles.loginBtn}>로그인</button>
        <Link to="/users/signup">
          <button className={styles.signupBtn} type="button">
            회원가입
          </button>
        </Link>
        <div className={styles.inlineContainer}>
          <div className={styles.divider}></div>
          <p>또는</p>
          <div className={styles.divider}></div>
        </div>
        <div className={styles.blank}>
          <KakaoLoginButton href={KAKAO_AUTH_URL} />
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
