import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { UpdateUser, logoutUser } from '../component/UserAction';
import styles from './UpdatePage.module.css';


function UpdatePage(props) {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.user.userData);
    const token = sessionStorage.getItem('token');
    const navigate = useNavigate();
    
    const [userNickName, setUserNickName] = useState(currentUser ? currentUser.userNickName : '');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');


    useEffect(() => {
        console.log('세션 스토리지에서 가져온 토큰:', token);
        
        if (currentUser) {
            setUserNickName(currentUser.userNickName);
        }
    }, [currentUser, token]);

    const onUserNickNameHandler = (event) => {
        setUserNickName(event.currentTarget.value);
    }
    const onCurrentPasswordHandler = (event) => {
        setCurrentPassword(event.currentTarget.value);
    }
    const onNewPasswordHandler = (event) => {
        setNewPassword(event.currentTarget.value);
    }
    const onConfirmNewPasswordHandler = (event) => {
        setConfirmNewPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log('업데이트 요청 시 사용되는 토큰:', token);


        if (!currentUser) {
            alert('사용자 정보가 존재하지 않습니다.');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            return alert('새 비밀번호와 비밀번호 확인이 같지 않습니다.');
        }
    
        let body = {
            userAccount: currentUser.userAccount,
            userNickName : userNickName,
            currentPassword : currentPassword,
            newPassword : newPassword,
        };
    
        dispatch(UpdateUser(body, currentUser.userAccount, token))
            .then(response => {
                console.log("Update Response:", response);
                if (response.success) {
                    alert('정보가 업데이트되었습니다.');
                    dispatch(logoutUser());
                    navigate('/'); 
                    alert("변경된 비밀번호로 다시 로그인해주세요")
                } else {
                    alert('정보 업데이트에 실패했습니다.');
                }
            })
            .catch(error => {
                console.error("Update Error", error);
                alert('정보 업데이트 중 오류가 발생했습니다');
        });

    };
    

  return (
    <div className={styles.body}>
      <form style={{ display: 'flex', flexDirection: 'column'}}
          onSubmit={onSubmitHandler}>  
        <div className={styles.header}>
            <h1>회원 정보 수정</h1>
        </div> 
        <div className={styles.inputDiv}>
            <label className={`${styles.labelWithImage} ${styles.nickname}`}></label>
            <input type='text' 
            value={userNickName} 
            onChange={onUserNickNameHandler}
            placeholder="새로운 닉네임을 입력하세요" />
        </div>
        <div className={styles.inputDiv}>
            <label className={`${styles.labelWithImage} ${styles.password}`}></label>
            <input type='password' 
            value={currentPassword} 
            onChange={onCurrentPasswordHandler} 
            placeholder="현재 비밀번호를 입력하세요" />
        </div>
        <div className={styles.inputDiv}>                
        <label className={`${styles.labelWithImage} ${styles.newPassword}`}></label>
            <input type='password' 
            value={newPassword} 
            onChange={onNewPasswordHandler} 
            placeholder="새 비밀번호를 입력하세요" />
        </div>
        <div className={styles.inputDiv}>                
            <label className={`${styles.labelWithImage} ${styles.confirmNewPassword}`}></label>
            <input type='password' 
            value={confirmNewPassword} 
            onChange={onConfirmNewPasswordHandler} 
            placeholder="새 비밀번호를 다시 입력하세요" />
        </div>
        <br />
        <button className={styles.updateSubmitBtn} formAction=''>
            수정하기
        </button>
        </form>
        </div>
    );
} 

export default UpdatePage;