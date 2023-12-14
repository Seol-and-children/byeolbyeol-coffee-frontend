import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from "./UserNickName.module.css";

function UserNickName() {
    const user = useSelector(state => state.user.userData);
    const navigate = useNavigate();

    if (!user) return <div>로그인 필요</div>;

    const handleButtonClick = () => {
        if (user.userRole === 3) {
            navigate('/admin');
        } else if (user.userRole === 2) {
            navigate('/users/mypage');
        }
    };

    return (
        <div>
            <button className={styles.myPageBtn} onClick={handleButtonClick}>
                {`${user.userNickName} 님`}
            </button>
        </div>
    );
}

export default UserNickName;