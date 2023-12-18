import React from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
  NavLink,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../component/UserAction"; // logoutUser 액션 크리에이터 임포트
import axios from "axios";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import UpdatePage from "./UpdatePage";
import Kakao from "../component/OAuth2RedirectHandeler";
import UserNickName from "../component/UserNickName";
import logo from "../../assets/logo.png";
import styles from "./Navbar.module.css";
import RecipeViewPage from "../../pages/RecipeViewPage";
import RecipeDetailViewPage from "../../pages/RecipeDetailViewPage";
import AddRecipePage from "../../pages/AddRecipePage";
import MyPage from "./MyPage";
import SearchBar from "../../search/component/SearchBar";
import RankingPage from "../../pages/RankingPage";
import EditRecipePage from "../../pages/EditRecipePage";
import SearchResult from "../../search/component/SearchResult";
import AdminPage from "../../admin/adminPage/AdminPage";
import RecipeByName from "../../search/component/check_search_result/nick_name_detail/RecipeByName";
import UserPage from "./UserPage";
import ReviewItem from "../../review/pages/ReviewItem";
import ReviewList from "../../review/pages/ReviewList";
import ReviewWrite from "../../review/pages/ReviewWrite";
import Main from "../../main/Main";

function Navbar() {
  const user = useSelector((state) => state.user?.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("userNickName 컴포넌트에서 로드한 사용자 데이터:", user);

  const goToHome = () => {
    navigate("/main");
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/users/login");
  };

  const handleRandomRecipe = async () => {
    try {
      const response = await axios.get("http://localhost:8080/recipes");
      const recipes = response.data;

      const randomIndex = Math.floor(Math.random() * recipes.length);
      const randomRecipe = recipes[randomIndex];

      navigate(`/recipes/${randomRecipe.recipeId}`);
    } catch (error) {
      console.error("레시피 목록을 가져오는데 실패했습니다:", error);
    }
  };

  return (
    <div>
      <div className={styles.navbarsection}>
        <div className={styles.innernavbar}>
          <div className={styles.navbarbutton}>
            <img
              className={styles.navbarLogo}
              src={logo}
              alt="별별커피 로고"
              onClick={goToHome}
            />

            <NavLink
              to="/recipes"
              className={({ isActive }) =>
                isActive
                  ? `${styles.recipePageBtn} ${styles.activeNavLink}`
                  : styles.recipePageBtn
              }
            >
              레시피
            </NavLink>

            <NavLink
              to="/ranking"
              className={({ isActive }) =>
                isActive
                  ? `${styles.rankinPageBtn} ${styles.activeNavLink}`
                  : styles.rankinPageBtn
              }
            >
              랭킹
            </NavLink>

            <NavLink
              to="/reviews"
              className={({ isActive }) =>
                isActive
                  ? `${styles.cafereviewPageBtn} ${styles.activeNavLink}`
                  : styles.cafereviewPageBtn
              }
            >
              카페리뷰
            </NavLink>

            <button
              id="randomcoffee"
              className={styles.randomPageBtn}
              onClick={handleRandomRecipe}
            >
              오늘 뭐마셔?
            </button>
          </div>
          <SearchBar />
          <div className="container">
            {user ? (
              <>
                <div className={styles.logoutBox}>
                  <UserNickName />
                  <button
                    id="logout"
                    className={styles.LogoutPageBtn}
                    onClick={handleLogout}
                  >
                    로그아웃
                  </button>
                </div>
              </>
            ) : (
              <Link to="/users/login">
                <button id="login" className={styles.LoginPageBtn}>
                  로그인
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Navigate to="/main" replace />} />
        <Route path="/main" element={<Main />} />
        <Route path="/add-recipe" element={<AddRecipePage />} />
        <Route path="/edit-recipe/:recipeId" element={<EditRecipePage />} />
        <Route path="/recipes/:recipeId" element={<RecipeDetailViewPage />} />
        <Route path="/recipes" element={<RecipeViewPage />} />
        <Route path="/users/login" element={<LoginPage />} />
        <Route path="/users/signup" element={<SignupPage />} />
        <Route path="/users/update" element={<UpdatePage />} />
        <Route path="/login/oauth/kakao/callback" element={<Kakao />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/users/mypage" element={<MyPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/moreSee/recipeByName" element={<RecipeByName />} />\
        <Route path="/search/:searchWord" element={<SearchResult />} />\
        <Route path="/users/:userId" element={<UserPage />} />
        <Route path="/reviews" element={<ReviewList />} />
        <Route path="/reviews/:reviewId" element={<ReviewItem />} />
        <Route path="/review-write" element={<ReviewWrite />} />
        {/* 여기에 더 많은 사용자 관련 라우트를 추가할 수 있습니다 */}
      </Routes>
    </div>
  );
}

export default Navbar;
