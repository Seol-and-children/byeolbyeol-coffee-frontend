import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { SignuprUser } from "../component/UserAction";
import "../styles/Page.css";
import { useNavigate } from "react-router-dom";

function SignupPage(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userAccount, setuserAccount] = useState("");
  const [userNickName, setuserNickName] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [userEmail, setuserEmail] = useState("");

  const onuserAccountHandler = (event) => {
    setuserAccount(event.currentTarget.value);
  };
  const onuserNickNameHandler = (event) => {
    setuserNickName(event.currentTarget.value);
  };
  const onuserPasswordHandler = (event) => {
    setuserPassword(event.currentTarget.value);
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };
  const onuserEmailHandler = (event) => {
    setuserEmail(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (userPassword !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인이 같지 않습니다.");
    }

    let body = {
      userAccount: userAccount,
      userPassword: userPassword,
      userNickName: userNickName,
      userEmail: userEmail,
    };

    dispatch(SignuprUser(body))
      .then((response) => {
        if (response && response.success) {
          alert("회원가입에 성공했습니다.");
          navigate("/users/login");
        } else {
          alert("회원가입에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("Signup error", error);
        alert("회원가입 중 오류가 발생했습니다");
      });
  };

  return (
    <div className="body">
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <div className="header">
          <h1>회원가입</h1>
        </div>
        <div className="inputDiv">
          <label className="labelWithImage account"></label>
          <input
            type="text"
            value={userAccount}
            onChange={onuserAccountHandler}
            placeholder="아이디를 입력하세요"
          />
        </div>
        <div className="inputDiv">
          <label className="labelWithImage password"></label>
          <input
            type="password"
            value={userPassword}
            onChange={onuserPasswordHandler}
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <div className="inputDiv">
          <label className="labelWithImage Confirm password"></label>
          <input
            type="password"
            value={ConfirmPassword}
            onChange={onConfirmPasswordHandler}
            placeholder="비밀번호를 다시 입력하세요"
          />
        </div>
        <div className="inputDiv">
          <label className="labelWithImage email"></label>
          <input
            type="Email"
            value={userEmail}
            onChange={onuserEmailHandler}
            placeholder="이메일 주소를 입력하세요"
          />
        </div>
        <div className="inputDiv">
          <label className="labelWithImage nickname"></label>
          <input
            type="text"
            value={userNickName}
            onChange={onuserNickNameHandler}
            placeholder="닉네임를 입력하세요"
          />
        </div>
        <br />
        <button className="signupsibmitBtn" formAction="">
          가입하기
        </button>
      </form>
    </div>
  );
}

export default SignupPage;
