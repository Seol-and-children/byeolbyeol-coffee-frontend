import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./UserPage.module.css";
import writeRecipe from "../../assets/RecipeIcon.svg";
import writeReview from "../../assets/ReviewIcon.svg";
import OtherUserRecentRecipes from "../component/OtherUserRecentPost";
import OtherUserRecnetReview from "../component/OtherUserRecentReview";
import OtherUserRecentPostCount from "../component/OtherUserRecentPostCount";

import OtherUserRecentReviewCount from "../component/OtherUserRecentReviewCount";


function UserPage() {
  const { userId } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`/users/other/${userId}`);
        console.log("받은 응답:", response.data);

        if (response.data.data.userRole === 3) {
          alert("사용자 정보 로딩 중 오류가 발생했습니다");
          navigate("/");
          return;
        }

        setUserInfo(response.data);
      } catch (error) {
        console.error("사용자 정보 로딩 중 오류 발생", error);
      }
    };

    fetchUserInfo();
  }, [userId, navigate]);

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
          <h1>{userInfo.data.userNickName}님의 페이지</h1>
        </div>

        <div className={styles.mySelfBlock}>
        <div className={styles.rowContainer}>
          <h2>{userInfo.data.userNickName}</h2>
          <div className={styles.rowContainer}>
          <div  className={`${styles.rowContainer} ${styles.count}`}>
          <img src={writeRecipe} alt="작성한 레시피" />
          <OtherUserRecentPostCount userId={userInfo.data.userId} />
          </div>
          <div  className={`${styles.rowContainer} ${styles.count}`}> 
          <img src={writeReview} alt="작성한 리뷰" />
          <OtherUserRecentReviewCount userId={userInfo.data.userId} />
          </div>
          </div>
          </div>
          <div className={styles.divider}></div>
          <h3>{userInfo.data.userBio}</h3>
        </div>
      </div>


      <div className={styles.block}>
        <h2>최근 작성한 레시피</h2>
        <div className={styles.divider}></div>
        <OtherUserRecentRecipes userId={userInfo.data.userId} />
      </div>

      <div className={styles.block}>
        <h2>최근 작성한 게시글</h2>
        <div className={styles.divider}></div>
        <OtherUserRecnetReview userId={userInfo.data.userId} />
      </div>
    </div>
  );
}

export default UserPage;
