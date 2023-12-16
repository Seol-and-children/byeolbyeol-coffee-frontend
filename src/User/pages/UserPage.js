import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./MyPage.module.css";
import UserRecentRecipes from "../component/UserRecentPost";

function UserPage() {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`/users/${userId}`);
        setUserInfo(response.data);
      } catch (error) {
        console.error("사용자 정보 로딩 중 오류 발생", error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  if (!userInfo) {
    return <div>사용자 정보 불러오는 중...</div>;
  }

  return (
    <div className={styles.userPageContainer}>
      <div className={styles.userInfo}>
        <h1>{userInfo.userNickName}</h1>
        <div className={styles.userBio}>
          <h2>자기소개</h2>
          <p>{userInfo.userBio}</p>
        </div>
      </div>

      <div className={styles.userPosts}>
        <h2>최근 작성한 레시피</h2>
        <UserRecentRecipes userId={userInfo.id} />
        {/* 여기에 최근 작성한 게시글 컴포넌트 추가 */}
      </div>
    </div>
  );
}

export default UserPage;
