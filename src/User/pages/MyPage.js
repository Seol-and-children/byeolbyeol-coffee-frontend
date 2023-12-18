import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./MyPage.module.css"; // 스타일 모듈 불러오기
import UserRecentRecipes from "../component/UserRecentPost";
import UserRecentReview from "../component/UserRecentReview";
import { logoutUser, updateUserBio } from "../component/UserAction";
import Edit from "../../assets/Edit.svg";
import writeRecipe from "../../assets/RecipeIcon.svg";
import writeReview from "../../assets/ReviewIcon.svg";
import UserRecentPostCount from "../component/UserRecentPostCount";
import UserRecentReviewCount from "../component/UserRecentReviewCount";

function MyPage() {
  const user = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const modalBackground = useRef();
  const [userBio, setBio] = useState("");

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
      setBio(user.userBio || "");
    }
  }, [user]);

  const handleBioUpdate = async () => {
    try {
      console.log("백엔드로 보내는 userBio 데이터:", userBio);
      const response = await axios.put(
        `/users/${user.userAccount}/bio`,
        userBio,
        {
          headers: {
            "Content-Type": "text/plain",
          },
        }
      );
      console.log("백엔드로부터 받은 응답:", response.data);
      alert("자기소개가 업데이트되었습니다.");
      dispatch(updateUserBio(user.userAccount, response.data.data.userBio));
      handleModalClose();
    } catch (error) {
      console.error("자기소개 업데이트 실패", error);
      alert("자기소개 업데이트 중 오류가 발생했습니다.");
    }
  };

  const handleRecipeMoreSeeClick = (data) => {
    const queryString = new URLSearchParams({data}).toString();
    window.location.href = `/moreSee/recipeByName?${queryString}`;
  };

  const handleReviewMoreSeeClick = (data) => {
    const queryString = new URLSearchParams({data}).toString();
    window.location.href = `/moreSee/reviewByName?${queryString}`;
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("정말로 회원 탈퇴를 하시겠습니까?")) {
      try {
        await axios.delete(`/users/${user.userAccount}`);
        alert("회원 탈퇴가 완료되었습니다.");
        dispatch(logoutUser());
        navigate("/");
      } catch (error) {
        console.error("회원 탈퇴 중 오류 발생", error);
        alert("회원 탈퇴 처리 중 오류가 발생했습니다.");
      }
    }
  };

  if (!user) {
    return <div>로그인이 필요합니다.</div>;
  }

  return (
    <div className={styles.myPageContainer}>
      <div className={styles.userinfo}>
        <div className={styles.rowContainer}>
        <h1>마이페이지</h1>
          <div>
            <button className={styles.Btn} onClick={handleModalOpen}>
              <div className={styles.BtnCenter}>
                자기소개 수정
                <img src={Edit} alt="정보 수정" />
              </div>
            </button>
            {modalOpen && (
              <div
                className={styles.modalcontainer}
                ref={modalBackground}
                onClick={(e) => {
                  if (e.target === modalBackground.current) {
                    handleModalClose();
                  }
                }}>
                <div className={styles.modalcontent}>
                  <p>자기소개 수정</p>
                  <div className={styles.divider}></div>
                  <textarea
                    className={styles.textArea}
                    value={userBio}
                    onChange={handleBioChange}
                  ></textarea>
                  <div></div>
                  <button className={styles.Btn} onClick={handleBioUpdate}>
                    저장하기
                  </button>
                  <button className={styles.Btn} onClick={handleModalClose}>
                    닫기
                  </button>
                </div>
              </div>
            )}
            <Link to="/users/update">
              <button className={styles.Btn}>
                <div className={styles.BtnCenter}>
                  회원정보 수정
                  <img src={Edit} alt="정보 수정" />
                </div>
              </button>
            </Link>
          </div>
        </div>
        <div className={styles.mySelfBlock}>
        <div className={styles.rowContainer}>
          <h2>{user.userNickName}</h2>
          < div className={styles.rowContainer}>
              <div  className={`${styles.rowContainer} ${styles.count}`}>
              <img src={writeRecipe} alt="작성한 레시피" />
              <UserRecentPostCount userId={user.userId} />
              </div>
              <div  className={`${styles.rowContainer} ${styles.count}`}> 
              <img src={writeReview} alt="작성한 리뷰" />
              <UserRecentReviewCount userId={user.userId} />
              </div>
            </div>
          </div>
          <div className={styles.divider}></div>
          <h3>{user.userBio}</h3>
        </div>

        <div className={styles.block}>
          < div className={styles.rowContainer}>
          <h2>최근 작성한 레시피 </h2>
            <button className={styles.moreSerach} type="button" onClick={() => handleRecipeMoreSeeClick(user.userNickName)}>
              전체보기
            </button>
          </div>
          <div className={styles.divider}></div>
          <UserRecentRecipes userId={user.userid} />
        </div>

        <div className={styles.block}>
          < div className={styles.rowContainer}>
          <h2>최근 작성한 게시글</h2>
            <button className={styles.moreSerach} type="button" onClick={() => handleReviewMoreSeeClick(user.userNickName)}>
              전체보기
            </button>
          </div>
          <div className={styles.divider}></div>
          <UserRecentReview userId={user.userid} />
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
