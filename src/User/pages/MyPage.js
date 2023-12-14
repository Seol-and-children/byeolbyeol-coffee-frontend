import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import styles from './MyPage.module.css'; // 스타일 모듈 불러오기
import UserRecentRecipes from '../component/UserRecentPost';
import { logoutUser, updateUserBio } from '../component/UserAction'; 
import Edit from '../../assets/Edit.svg'

function MyPage() {
    const user = useSelector(state => state.user.userData);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const modalBackground = useRef();
    const [userBio, setBio] = useState(''); // 초기 상태를 빈 문자열로 설정

    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleBioChange = (event) => {
        setBio(event.target.value);
    };

    useEffect(() => {
        if (user) {
            console.log("현재 Redux 스토어 상태:", user);
            setBio(user.userBio || '');
        }
    }, [user])

    const handleBioUpdate = async () => {
        try {
            console.log("백엔드로 보내는 userBio 데이터:", userBio);
            const response = await axios.put(`/users/${user.userAccount}/bio`, userBio, {
                headers: {
                    'Content-Type': 'text/plain'
                }
            });
           console.log("백엔드로부터 받은 응답:", response.data);
            alert('자기소개가 업데이트되었습니다.');
            dispatch(updateUserBio(user.userAccount, response.data.data.userBio));
            handleModalClose();
        } catch (error) {
            console.error('자기소개 업데이트 실패', error);
            alert('자기소개 업데이트 중 오류가 발생했습니다.');
        }
    };
    
    

    const handleDeleteAccount = async () => {
        if (window.confirm('정말로 회원 탈퇴를 하시겠습니까?')) {
            try {
                await axios.delete(`/users/${user.userAccount}`);
                alert('회원 탈퇴가 완료되었습니다.');
                dispatch(logoutUser());
                navigate('/'); 
            } catch (error) {
                console.error('회원 탈퇴 중 오류 발생', error);
                alert('회원 탈퇴 처리 중 오류가 발생했습니다.');
            }
        }
    };

    if (!user) {
        return <div>로그인이 필요합니다.</div>;
    }

    return (
        <div className={styles.myPageContainer}>
            
            
            <div className={styles.userinfo}>
            <h1>마이페이지</h1>
            <div className={styles.rowContainer}>
            <h2>{user.userNickName}</h2>
                <div>
                <button className={styles.Btn} onClick={handleModalOpen}>
                    <div className={styles.BtnCenter} >
                        자기소개 수정
                        <img src={Edit} alt="정보 수정" />
                    </div>
                </button>
                {
                    modalOpen &&
                    <div className={styles.modalcontainer} ref={modalBackground} onClick={e => {
                        if (e.target === modalBackground.current) {
                            handleModalClose();
                        }
                    }}>
                        <div className={styles.modalcontent}>
                            <p>자기소개 수정</p>
                            <div className={styles.divider}></div>
                            <textarea className={styles.textArea} value={userBio} onChange={handleBioChange}></textarea>
                            <div></div>
                            <button className={styles.Btn} onClick={handleBioUpdate}>저장하기</button>
                            <button  className={styles.Btn}onClick={handleModalClose}>닫기</button>
                        </div>
                    </div>
                }
                    <Link to="/users/update">
                    <button className={styles.Btn}>
                        <div className={styles.BtnCenter} >
                            회원정보 수정
                            <img src={Edit} alt="정보 수정" />
                        </div>                            
                    </button>
                    </Link>
                </div>
            </div>
                <div className={styles.mySelfBlock}>
                    <h2>자기소개</h2>
                    <div className={styles.divider}></div>
                    <h3>{user.userBio}</h3>
                </div>
                <div className={styles.block}>
                    <h2>최근 작성한 레시피 </h2>
                    <div className={styles.divider}></div>
                    <UserRecentRecipes userId={user.id} />
                </div>
                
                <div className={styles.block}>
                    <h2>최근 작성한 게시글</h2>
                </div>
                <div className={styles.rightAlign}>
                    <button className={styles.deleteBtn} onClick={handleDeleteAccount}>
                        회원 탈퇴
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MyPage;
