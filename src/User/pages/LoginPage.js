import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../Component/UserAction';
import '../styles/Page.css';

function LoginPage() {

    const dispatch = useDispatch();

    const [Account, setAccount] = useState("");
    const [Password, setPassword] = useState("");      

    const onAccountHandler = (event) => {
        setAccount(event.currentTarget.value);
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }
    const onSubmitHandler = (event) => {
        event.preventDefault();

        console.log('Account', Account);
        console.log('Password', Password);
        
        let body = {
            userAccount: Account,
            userPassword: Password,
        }

        dispatch(loginUser(body));
    }

    return (
        <div className='body'>
            <form style={{ display: 'flex', flexDirection: 'column'}}
            onSubmit={onSubmitHandler}>
               <div className="inputDiv">
                    <label className="labelWithImage account"></label>
                    <input type="text" 
                    value={Account}
                    onChange={onAccountHandler}
                    placeholder="아이디를 입력하세요"/>
                </div>
                <div className="inputDiv">
                    <label className="labelWithImage password"></label>
                    <input type="password" 
                    value={Password} 
                    onChange={onPasswordHandler} 
                    placeholder="비밀번호를 입력하세요"/>
                </div>
                <br />
                <button 
                className="loginButton">
                로그인
                </button>
                <Link to="/users/signup">
                    <button className="signupButton" type="button">
                        회원가입
                    </button>
                </Link>
                <div className="inlineContainer">
                <div className='divider'></div>
                <p>또는</p>
                <div className='divider'></div>
                </div>

                <Link to="/kakao-login">
                <button className="" type="button">
                    카카오
                </button>
                </Link>

            </form>
        </div>
    )
}

export default LoginPage;