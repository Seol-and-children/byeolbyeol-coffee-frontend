import React, { useState } from "react";
// import InputField from '../Component/InputField';
// import UpdateButton from '../Component/UpdateButton';

function UpdatePage() {
  const [formData, setFormData] = useState({
    nickname: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {/* <InputField
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
  <UpdateButton /> */}
    </form>
  );
}

export default UpdatePage;
