  import React, { useState } from "react";
  import axios from "axios";
  import { useDispatch } from "react-redux";
  import { SignuprUser } from "../component/UserAction";
  import styles from "./SignupPage.module.css";
  import { useNavigate } from "react-router-dom";

  function SignupPage(props) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userAccount, setUserAccount] = useState("");
    const [userNickName, setUserNickName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [errors, setErrors] = useState({
      userAccountError: "",
      userNickNameError: "",
      userEmailError: "",
      userPasswordError: "",
      confirmPasswordError: "",
    });

    const [successMessages, setSuccessMessages] = useState({
      userAccountSuccess: "",
      userEmailSuccess: "",
      userNickNameSuccess: "",
      // 다른 성공 메시지 상태 필요 시 추가
    });

    const onUserAccountHandler = (event) => {
      const accountValue = event.currentTarget.value;
      setUserAccount(accountValue);
    
      if (containsWhitespace(accountValue)) {
        setErrors(prev => ({ ...prev, userAccountError: "공백을 허용하지 않습니다." }));
      } else if (!validateUserAccount(accountValue)) {
        setErrors(prev => ({ ...prev, userAccountError: "아이디는 영문과 숫자로만 구성되며, 길이는 5-15자 사이여야 합니다." }));
      } else {
        setErrors(prev => ({ ...prev, userAccountError: "" }));
      }
    };

    const validatePassword = (password) => {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,20}$/;
      return passwordRegex.test(password);
    };


    const checkUserAccountDuplicate = async () => {
      try {
        const response = await axios.get(`/users/checkUserAccount/${userAccount}`);

        if (response.data === true) {
          // 중복이 아닌 경우
          setSuccessMessages(prevMessages => ({ ...prevMessages, userAccountSuccess: '사용 가능한 아이디입니다.' }));
          setErrors(prevErrors => ({ ...prevErrors, userAccountError: '' })); // 에러 메시지 초기화
        } else {
          // 중복인 경우
          setErrors(prevErrors => ({ ...prevErrors, userAccountError: '이미 사용중인 아이디입니다.' }));
          setUserAccount('');
        }
      } catch (error) {
        console.error('중복 검사 실패', error);
        setErrors(prevErrors => ({ ...prevErrors, userAccountError: '중복 검사 중 오류가 발생했습니다.' }));
      }
    };

    const onUserPasswordHandler = (event) => {
      const passwordValue = event.currentTarget.value;
      setUserPassword(passwordValue);
    
      if (containsWhitespace(passwordValue)) {
        setErrors(prev => ({ ...prev, userPasswordError: "공백은 허용되지 않습니다." }));
      } else if (!validatePassword(passwordValue)) {
        setErrors(prev => ({ ...prev, userPasswordError: "비밀번호는 영문과 숫자, 특수문자의 조합으로 7-20자 사이여야 합니다." }));
      } else {
        setErrors(prev => ({ ...prev, userPasswordError: "" }));
      }
    };

    const onConfirmPasswordHandler = (event) => {
      const confirmPasswordValue = event.currentTarget.value;
      setConfirmPassword(confirmPasswordValue);
    
      if (userPassword !== confirmPasswordValue) {
        setErrors(prev => ({ ...prev, confirmPasswordError: "비밀번호가 일치하지 않습니다." }));
      } else {
        setErrors(prev => ({ ...prev, confirmPasswordError: "" }));
      }
    };
    
    const validateUserAccount = (account) => {
      const accountRegex = /^[A-Za-z0-9]{5,15}$/;
      return accountRegex.test(account);
    };

    const onUserEmailHandler = (event) => {
      const emailValue = event.currentTarget.value;
      setUserEmail(emailValue);
      
      if (!validateEmail(emailValue)) {
        setErrors(prev => ({ ...prev, userEmailError: "잘못된 이메일 형식입니다." }));
      } else {
        // 이메일 형식이 올바른 경우 중복 확인 메시지도 지웁니다.
        setErrors(prev => ({ ...prev, userEmailError: "" }));
      }
    };

    const checkUserEmailDuplicate = async () => {
      try {
        const response = await axios.get(`/users/checkUserEmail/${userEmail}`);
        
        if (response.data === true) {
          // 이메일이 중복되지 않은 경우
          setSuccessMessages(prev => ({ ...prev, userEmailSuccess: '사용 가능한 이메일입니다.' }));
        } else {
          // 이메일이 중복된 경우
          setErrors(prevErrors => ({ ...prevErrors, userEmailError: '이미 사용 중인 이메일입니다.' }));
          setSuccessMessages(prev => ({ ...prev, userEmailSuccess: '' })); // 중복된 경우 성공 메시지를 지웁니다.
          setUserEmail('');
        }
      } catch (error) {
        console.error('이메일 중복 검사 실패', error);
        setErrors(prevErrors => ({ ...prevErrors, userEmailError: '이메일 중복 검사 중 오류가 발생했습니다.' }));
        setSuccessMessages(prev => ({ ...prev, userEmailSuccess: '' })); // 오류가 발생한 경우 성공 메시지를 지웁니다.
      }
    };

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const containsWhitespace = (str) => {
      return /\s/.test(str);
    };

    const onUserNickNameHandler = (event) => {
      const nicknameValue = event.currentTarget.value;
      setUserNickName(nicknameValue);
    
      if (!validateNickname(nicknameValue)) {
        setErrors(prev => ({ ...prev, userNickNameError: "닉네임은 3-10자 사이이며, 특수문자를 포함할 수 없습니다." }));
      } else {
        setErrors(prev => ({ ...prev, userNickNameError: "" }));
      }
    };

    const checkUserNickNameDuplicate = async () => {
      try {
        const response = await axios.get(`/users/checkUserNickName/${userNickName}`);
    
        if (response.data === true) {
          // 닉네임이 중복되지 않은 경우
          setSuccessMessages(prevMessages => ({ ...prevMessages, userNickNameSuccess: '사용 가능한 닉네임입니다.' }));
          setErrors(prevErrors => ({ ...prevErrors, userNickNameError: '' })); // 에러 메시지 초기화
        } else {
          // 닉네임이 중복된 경우
          setErrors(prevErrors => ({ ...prevErrors, userNickNameError: '이미 사용 중인 닉네임입니다.' }));
        }
      } catch (error) {
        console.error('닉네임 중복 검사 실패', error);
        setErrors(prevErrors => ({ ...prevErrors, userNickNameError: '닉네임 중복 검사 중 오류가 발생했습니다.' }));
      }
    };
    
    const validateNickname = (nickname) => {
      const nicknameRegex = /^[A-Za-z0-9가-힣]{3,10}$/;
      return nicknameRegex.test(nickname);
    };

    const onSubmitHandler = (event) => {
      event.preventDefault();
    
      // 필드가 비어 있는지 확인
      if (!userAccount || !userPassword || !confirmPassword || !userEmail || !userNickName) {
        alert('모든 필드를 채워주세요.');
        return;
      }
    
      // 에러 메시지가 있는지 확인
      if (errors.userAccountError || errors.userPasswordError || errors.confirmPasswordError || errors.userEmailError || errors.userNickNameError) {
        alert('모든 에러를 해결해주세요.');
        return;
      }
    
      // 회원가입 로직
      let body = {
        userAccount,
        userPassword,
        userNickName,
        userEmail,
      };

      dispatch(SignuprUser(body))
        .then(response => {
          if (response && response.success) {
            alert("회원가입에 성공했습니다.");
            navigate("/users/login");
          } else {
            alert("회원가입에 실패했습니다.");
          }
        })
        .catch(error => {
          console.error("Signup error", error);
          alert("회원가입 중 오류가 발생했습니다");
        });
    };

    return (
      <div className={styles.body}>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={onSubmitHandler}
        >
          <div className={styles.header}>
            <h1>회원가입</h1>
          </div>

          <div className={styles.inputDiv}>
            <label className={`${styles.labelWithImage} ${styles.account}`}></label>
            <div className={styles.inputGroup}>
              <input
                type="text"
                value={userAccount}
                onChange={onUserAccountHandler}
                placeholder="아이디를 입력하세요"
              />
              <button type="button" onClick={checkUserAccountDuplicate}>중복 확인</button>
            </div>
            {errors.userAccountError && (
              <p className={styles.error}>
                {errors.userAccountError}
              </p>
            )}
            {successMessages.userAccountSuccess && (
              <p className={styles.successMessage}>
                {successMessages.userAccountSuccess}
              </p>
            )}
            </div>


          <div className={styles.inputDiv}>
            <label
              className={`${styles.labelWithImage} ${styles.password}`}
            ></label>
            <input
              type="password"
              value={userPassword}
              onChange={onUserPasswordHandler}
              placeholder="비밀번호를 입력하세요"
            />
            {errors.userPasswordError && <p className={styles.error}>{errors.userPasswordError}</p>}
          </div>
          
          <div className={styles.inputDiv}>
            <label
              className={`${styles.labelWithImage} ${styles.ConfirmPassword}`}
            ></label>
            <input
              type="password"
              value={confirmPassword}
              onChange={onConfirmPasswordHandler}
              placeholder="비밀번호를 다시 입력하세요"
            />
            {errors.confirmPasswordError && <p className={styles.error}>{errors.confirmPasswordError}</p>}
          </div>

          <div className={styles.inputDiv}>
            <label 
            className={`${styles.labelWithImage} ${styles.email}`}
            ></label>
            <div className={styles.inputGroup}>
            <input
              type="Email"
              value={userEmail}
              onChange={onUserEmailHandler}
              placeholder="이메일 주소를 입력하세요"
              className={errors.userEmailError ? 'errorInput' : ''}
            />
            <button type="button" onClick={checkUserEmailDuplicate}>중복 확인</button>
          </div>
          {errors.userEmailError && (
            <p className={styles.error}>
              {errors.userEmailError}
            </p>
          )}
          {successMessages.userEmailSuccess && (
            <p className={styles.successMessage}>
              {successMessages.userEmailSuccess}
            </p>
          )}
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
              placeholder="닉네임를 입력하세요"
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

          <br />
          <button className={styles.signupsibmitBtn} formAction="">
            가입하기
          </button>
        </form>
      </div>
    );
  }

  export default SignupPage;
