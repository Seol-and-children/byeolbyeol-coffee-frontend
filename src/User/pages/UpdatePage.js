import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UpdateUser, logoutUser } from "../component/UserAction";
import styles from "./UpdatePage.module.css";
import lockPerson from "../../assets/Lockperson.svg"


function UpdatePage(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const currentUser = useSelector((state) => state.user.userData);
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const [userNickName, setUserNickName] = useState(
    currentUser ? currentUser.userNickName : ""
  );
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errors, setErrors] = useState({
    userNickNameError: "",
    currentPasswordError: "",
    newPasswordError: "",
    confirmNewPasswordError: "",
  });

  const [successMessages, setSuccessMessages] = useState({
    userAccountSuccess: "",
    userEmailSuccess: "",
    userNickNameSuccess: "",
    // 다른 성공 메시지 상태 필요 시 추가
  });

  const validateNickname = (nickname) => {
    const nicknameRegex = /^[A-Za-z0-9가-힣]{3,10}$/;
    return nicknameRegex.test(nickname);
  };

  useEffect(() => {
    console.log("세션 스토리지에서 가져온 토큰:", token);

    if (currentUser) {
      setUserNickName(currentUser.userNickName);
    }
  }, [currentUser, token]);

  const onUserNickNameHandler = (event) => {
    const nicknameValue = event.currentTarget.value;
    setUserNickName(nicknameValue);
  
    setSuccessMessages((prevMessages) => ({
      ...prevMessages,
      userNickNameSuccess: '',
    }));
    if (!validateNickname(nicknameValue)) {
      setErrors(prev => ({ ...prev, userNickNameError: "닉네임은 3-10자 사이이며, 특수문자를 포함할 수 없습니다." }));
    } else {
      setErrors(prev => ({ ...prev, userNickNameError: "" }));
    }
  };

  const checkUserNickNameDuplicate = async () => {
    try {
      // 사용자가 입력한 닉네임과 현재 사용 중인 닉네임이 다른 경우에만 중복 검사 수행
      if (userNickName !== currentUser.userNickName) {
        const response = await axios.get(`/users/checkUserNickName/${userNickName}`);
  
        if (response.data === true) {
          // 닉네임이 중복되지 않은 경우
          setSuccessMessages((prevMessages) => ({
            ...prevMessages,
            userNickNameSuccess: '사용 가능한 아이디입니다.',
          }));
          setErrors((prevErrors) => ({ ...prevErrors, userNickNameError: '' })); // 에러 메시지 초기화
        } else {
          // 닉네임이 중복된 경우
          setErrors((prevErrors) => ({
            ...prevErrors,
            userNickNameError: '이미 사용 중인 닉네임입니다.',
          }));
          // 기존과 같은 사용 가능한 닉네임입니다. 메시지 추가
          setSuccessMessages((prevMessages) => ({
            ...prevMessages,
            userNickNameSuccess: '기존과 같은 사용 가능한 닉네임입니다.',
          }));
        }
      } else {
        // 사용자가 입력한 닉네임이 현재 사용 중인 닉네임과 같은 경우
        setSuccessMessages((prevMessages) => ({
          ...prevMessages,
          userNickNameSuccess: '기존과 같은 사용 가능한 닉네임입니다.',
        }));
        setErrors((prevErrors) => ({ ...prevErrors, userNickNameError: '' }));
      }
    } catch (error) {
      console.error('닉네임 중복 검사 실패', error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        userNickNameError: '닉네임 중복 검사 중 오류가 발생했습니다.',
      }));
    }
  };

  const checkUserPassword = async () => {
    const userId = user.userId;
    const userPassword = currentPassword;  // 변수명 오타 수정
    console.log("userID 확인", userId);
    console.log("비밀번호 확인", userPassword);
    try {
      const response = await axios.post('/users/checkUserPassword', { userId, userPassword });
      if (response.data === true) {
        setSuccessMessages(prev => ({ ...prev, currentPasswordSuccess: '현재 비밀번호와 일치합니다.' }));
      } else {
        setErrors(prevErrors => ({ ...prevErrors, currentPasswordError: '현재 비밀번호와 일치하지 않습니다.' }));
        setSuccessMessages(prev => ({ ...prev, currentPasswordSuccess: '' }));
        setCurrentPassword('');
      }
    } catch (error) {
      console.error('비밀번호 확인 실패', error);
      setErrors(prevErrors => ({ ...prevErrors, currentPasswordError: '비밀번호 확인 중 오류가 발생했습니다.' }));
      setSuccessMessages(prev => ({ ...prev, currentPasswordSuccess: '' }));
    }
};

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,20}$/;
    return passwordRegex.test(password);
  };


  const containsWhitespace = (str) => {
    return /\s/.test(str);
  };

  const onCurrentPasswordHandler = (event) => {
    setCurrentPassword(event.currentTarget.value);
  };

  const onNewPasswordHandler = (event) => {
    const passwordValue = event.currentTarget.value;
    setNewPassword(passwordValue);
  
    if (containsWhitespace(passwordValue)) {
      setErrors(prev => ({ ...prev, newPasswordError: "공백은 허용되지 않습니다." }));
    } else if (!validatePassword(passwordValue)) {
      setErrors(prev => ({ ...prev, newPasswordError: "비밀번호는 영문과 숫자, 특수문자의 조합으로 7-20자 사이여야 합니다." }));
    } else {
      setErrors(prev => ({ ...prev, newPasswordError: "" }));
    };
  }

  const onConfirmNewPasswordHandler = (event) => {
    const confirmNewPasswordValue = event.currentTarget.value;
    setConfirmNewPassword(confirmNewPasswordValue);

    if (newPassword !== confirmNewPasswordValue) {
      setErrors(prev => ({ ...prev, confirmNewPasswordError: "비밀번호가 일치하지 않습니다." }));
    } else {
      setErrors(prev => ({ ...prev, confirmNewPasswordError: "" }));
    }
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
      userNickName: userNickName,
      currentPassword: currentPassword,
      newPassword: newPassword,
    };

    dispatch(UpdateUser(body, currentUser.userAccount, token))
      .then((response) => {
        console.log("Update Response:", response);
        if (response.success) {
          alert("정보가 업데이트되었습니다.");
          dispatch(logoutUser());
          navigate("/");
          alert("변경된 비밀번호로 다시 로그인해주세요");
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
    <div className={styles.body}>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}>
        <div className={styles.header}>
          <h1>회원 정보 수정</h1>
        </div>
        <div className={styles.inputDiv}>
          <label
            className={`${styles.labelWithImage} ${styles.account}`}
          ></label>
          <div className={styles.displayAccount}>
             {user.userAccount}  
             <img src={lockPerson} alt="잠김" />
          </div>
          </div>

        <div className={styles.inputDiv}>
          <label
            className={`${styles.labelWithImage} ${styles.nickname}`}
          ></label>
          <div className={styles.inputGroup}>
          <input
            type="text"
            value={userNickName}
            onChange={onUserNickNameHandler}
            placeholder="새로운 닉네임을 입력하세요"
          />
          <button type="button" onClick={checkUserNickNameDuplicate}>중복 확인</button> 
          </div>
          {errors.userNickNameError && (
            <p className={styles.error}>
              {errors.userNickNameError}
            </p>
          )}
          {successMessages.userNickNameSuccess && (
            <p className={styles.successMessage}>
              {successMessages.userNickNameSuccess}
            </p>
          )}
        </div>

        <div className={styles.inputDiv}>
          <label
            className={`${styles.labelWithImage} ${styles.password}`}
          ></label>
          <div className={styles.inputGroup}>
          <input
            type="password"
            value={currentPassword}
            onChange={onCurrentPasswordHandler}
            placeholder="현재 비밀번호를 입력하세요"
          />
          <button type="button" onClick={checkUserPassword}> 확인</button> 
          </div>
          {errors.currentPasswordError && (
            <p className={styles.error}>
              {errors.currentPasswordError}
            </p>
          )}
          {successMessages.currentPasswordSuccess && (
            <p className={styles.successMessage}>
              {successMessages.currentPasswordSuccess}
            </p>
          )}
        </div>

        <div className={styles.inputDiv}>
          <label
            className={`${styles.labelWithImage} ${styles.newPassword}`}
          ></label>
          <input
            type="password"
            value={newPassword}
            onChange={onNewPasswordHandler}
            placeholder="새 비밀번호를 입력하세요"
          />
          {errors.newPasswordError && (
            <p className={styles.error}>
              {errors.newPasswordError}
            </p>
          )}
        </div>

        <div className={styles.inputDiv}>
          <label
            className={`${styles.labelWithImage} ${styles.confirmNewPassword}`}
          ></label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={onConfirmNewPasswordHandler}
            placeholder="새 비밀번호를 다시 입력하세요"
          />
          {errors.confirmNewPasswordError && (
            <p className={styles.error}>
              {errors.confirmNewPasswordError}
            </p>
          )}
        </div>
        
        <br />
        <button className={styles.updateSubmitBtn} formAction="">
          수정하기
        </button>
      </form>
    </div>
  );
}

export default UpdatePage;
