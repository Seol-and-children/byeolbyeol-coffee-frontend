import React from 'react';
import { useSelector } from 'react-redux';

function UserNickName() {
    const user = useSelector(state => state.user.userData);
    console.log('userData:', user); //들어오는 데이터

    if (!user) return <div>로그인 필요</div>;

    return <div>{`${user.userNickName} 님`}</div>;
}

export default UserNickName;
