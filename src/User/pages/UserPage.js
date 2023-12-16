import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./UserPage.module.css";
import OtherUserRecentRecipes from "../component/OtherUserRecentPost";

function UserPage() {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`/users/other/${userId}`);
        console.log("받은 응답:", response.data); 
        setUserInfo(response.data);
      } catch (error) {
        console.error("사용자 정보 로딩 중 오류 발생", error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  useEffect(() => {
    console.log("userInfo 상태가 업데이트됨:", userInfo);
  }, [userInfo]);


  if (!userInfo) {
    return <div>사용자 정보 불러오는 중...</div>;
  }

  return (
    <div className={styles.userPageContainer}>

      <div className={styles.userInfo}>
      <div className={styles.rowContainer}>
        <h2>{userInfo.data.userNickName}님의 페이지</h2>
        </div>
        <div className={styles.mySelfBlock}>
          <h2>자기소개</h2>
          <div className={styles.divider}></div>
          <h3>{userInfo.data.userBio}</h3>
        </div>
      </div>

      
    {userInfo && (
      <div className={styles.block}>
        <h2>최근 작성한 레시피</h2>
        <div className={styles.divider}></div>
        <OtherUserRecentRecipes userId={userInfo.data.userId} />
      </div>
    )}

      <div className={styles.block}>
          <h2>최근 작성한 게시글</h2>
          <div className={styles.divider}></div>
      </div>


    </div>
  );
}

export default UserPage;
