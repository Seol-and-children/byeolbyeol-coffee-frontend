import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateUser } from "../Component/UserAction";

import "../styles/Page.css";

function UpdatePage(props) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.userData);
  const token = sessionStorage.getItem("token");

  const [userNickName, setUserNickName] = useState(
    currentUser ? currentUser.userNickName : ""
  );
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  useEffect(() => {
    console.log("세션 스토리지에서 가져온 토큰:", token);

    if (currentUser) {
      setUserNickName(currentUser.userNickName);
    }
  }, [currentUser, token]);

  const onUserNickNameHandler = (event) => {
    setUserNickName(event.currentTarget.value);
  };
  const onCurrentPasswordHandler = (event) => {
    setCurrentPassword(event.currentTarget.value);
  };
  const onNewPasswordHandler = (event) => {
    setNewPassword(event.currentTarget.value);
  };
  const onConfirmNewPasswordHandler = (event) => {
    setConfirmNewPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    console.log("업데이트 요청 시 사용되는 토큰:", token);

    if (!currentUser) {
      alert("사용자 정보가 존재하지 않습니다.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      return alert("새 비밀번호와 비밀번호 확인이 같지 않습니다.");
    }

    let body = {
      userAccount: currentUser.userAccount,
      userNickName: userNickName,
      currentPassword: currentPassword,
      newPassword: newPassword,
    };

    dispatch(UpdateUser(body, currentUser.userAccount, token))
      .then((response) => {
        console.log("Update Response:", response);
        if (response.success) {
          alert("정보가 업데이트되었습니다.");
          props.history.push("/userProfile");
        } else {
          alert("정보 업데이트에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("Update Error", error);
        alert("정보 업데이트 중 오류가 발생했습니다");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputField
        type="text"
        name="nickname"
        value={formData.nickname}
        onChange={handleChange}
        placeholder="닉네임"
      />
      <InputField
        type="password"
        name="currentPassword"
        value={formData.currentPassword}
        onChange={handleChange}
        placeholder="현재 비밀번호"
      />
      <InputField
        type="password"
        name="newPassword"
        value={formData.newPassword}
        onChange={handleChange}
        placeholder="새 비밀번호"
      />
      <InputField
        type="password"
        name="confirmNewPassword"
        value={formData.confirmNewPassword}
        onChange={handleChange}
        placeholder="새 비밀번호 확인"
      />
      <UpdateButton />
    </form>
  );
}

export default UpdatePage;
