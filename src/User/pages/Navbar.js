import React from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../component/UserAction"; // logoutUser 액션 크리에이터 임포트
import axios from "axios";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import UpdatePage from "./UpdatePage";
import Kakao from "../component/OAuth2RedirectHandeler";
import UserNickName from "../component/UserNickName";
import logo from "../../assets/logo.png";
import styles from './Navbar.module.css';
import RecipeViewPage from "../../pages/RecipeViewPage";
import RecipeDetailViewPage from "../../pages/RecipeDetailViewPage";
import AddRecipePage from "../../pages/AddRecipePage";
import MyPage from "./MyPage";
import SearchBar from "../../search/component/SearchBar";
import RankingPage from "../../pages/RankingPage";
import EditRecipePage from "../../pages/EditRecipePage";

function Navbar() {
  const user = useSelector((state) => state.user?.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("userNickName 컴포넌트에서 로드한 사용자 데이터:", user);

  const goToHome = () => {
    navigate("/");
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
        <img
          className={styles.navbarLogo}
          src={logo}
          alt="별별커피 로고"
          onClick={goToHome}
        />
        <Link to="/recipes">
          <button id="recipe" className={styles.recipePageBtn}>
            레시피
          </button>
        </Link>

        <Link to="/ranking">
          <button id="ranking" className={styles.rankinPagegBtn}>
            랭킹
          </button>
        </Link>
        <Link to="/">
          <button id="cafereview" className={styles.cafereviewPagewBtn}>
            카페리뷰
          </button>
        </Link>
        <button
          id="randomcoffee"
          className={styles.randomPageBtn}
          onClick={handleRandomRecipe}
        >
          오늘 뭐마셔?
        </button>
        <SearchBar />
        <div className="container">
          <img className="personicon" src={person} alt="User Icon" />
          {user ? (
            <>
              <UserNickName />
              <button
                id="logout"
                className={styles.LogoutPageBtn}
                onClick={handleLogout}
              >
                로그아웃
              </button>
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
      <Routes>
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
        {/* 여기에 더 많은 사용자 관련 라우트를 추가할 수 있습니다 */}
      </Routes>
    </div>
  );
}

export default Navbar;
