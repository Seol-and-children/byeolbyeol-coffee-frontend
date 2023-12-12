import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../Component/UserAction';
import '../styles/Page.css';
import KakaoLoginButton from '../Component/KakaoLoginButton';
import { KAKAO_AUTH_URL } from '../Component/KakaoLoginButton';
import logo from "../../Assets/logo.png"

function LoginPage() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [userAccount, setAccount] = useState("");
    const [userPassword, setPassword] = useState("");      

    const onAccountHandler = (event) => {
        setAccount(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();

        console.log('Account', userAccount);
        console.log('Password', userPassword);
        
        let body = {
            userAccount: userAccount,
            userPassword: userPassword,
        }

        dispatch(loginUser(body))
        .then(response => {
            console.log(response); // 서버 응답 로깅
            if (response.success) { // response.payload.success 대신 response.success 사용
                const { accessToken } = response.data;
                const loggedInUserNickName = response.data.userNickName;
                if (loggedInUserNickName) {
                    alert(`${loggedInUserNickName}님 로그인 되었습니다`);
                    sessionStorage.setItem('token', accessToken);
                    console.log('저장된 토큰:', response.data.accessToken);
                } else {
                    alert('로그인 정보를 불러오는 데 실패했습니다');
                }
                navigate('/users/update');
            } else {
                alert('아이디 또는 비밀번호가 틀렸습니다');
            }
        })
        .catch(error => {
            console.error("Login Error", error);
            alert('로그인 중 오류가 발생했습니다');
        });
    
    }   

    return (
        <div className='body'>
            <form style={{ display: 'flex', flexDirection: 'column'}}
            onSubmit={onSubmitHandler}>
                <div className='blank'>
                    <img className='logo' src={logo} alt="별별커피 로고" />
                </div>
                <div className="inputDiv">
                    <label className="labelWithImage account"></label>
                    <input type="text" 
                    value={userAccount}
                    onChange={onAccountHandler}
                    placeholder="아이디를 입력하세요"/>
                </div>
                <div className="inputDiv">
                    <label className="labelWithImage password"></label>
                    <input type="password" 
                    value={userPassword} 
                    onChange={onPasswordHandler} 
                    placeholder="비밀번호를 입력하세요"/>
                </div>
                <br />
                <button 
                className="loginBtn">
                로그인
                </button>
                <Link to="/users/signup">
                    <button className="signupBtn" type="button">
                        회원가입
                    </button>
                </Link>
                <div className="inlineContainer">
                <div className='divider'></div>
                <p>또는</p>
                <div className='divider'></div>
                </div>
                <div className='blank'>
                    <KakaoLoginButton href={KAKAO_AUTH_URL}>
                       <span>카카오 로그인</span>
                    </KakaoLoginButton>
                </div>
            </form>
        </div>
    )
}

export default LoginPage;