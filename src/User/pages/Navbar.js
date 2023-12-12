import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; 
import { logoutUser } from '../Component/UserAction'; // logoutUser 액션 크리에이터 임포트

import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import UpdatePage from './UpdatePage';
import UserNickName from '../Component/UserNickName';
import logo from "../../Assets/logo.png"
import person from "../../Assets/Person.svg"
import '../styles/Page.css';

import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import UpdatePage from "./UpdatePage";
// import UserNickName from "../Component/UserNickName";
import logo from "../../assets/logo.png";
import "../styles/Page.css";
import RecipeViewPage from "../../pages/RecipeViewPage";
import RecipeDetailViewPage from "../../pages/RecipeDetailViewPage";
import AddRecipePage from "../../pages/AddRecipePage";

function Navbar() {
  const user = useSelector((state) => state.user?.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToHome = () => {
    navigate("/");
  };

  /*
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/users/login");
  };
*/

  return (
    <div>
      <div className="navbar-section">
        <img
          className="navbarLogo"
          src={logo}
          alt="별별커피 로고"
          onClick={goToHome}
        />
        <Link to="/recipes">
          <button id="recipe" className="recipePageBtn">
            레시피
          </button>
        </Link>
        <Link to="/">
          <button id="ranking" className="rankinPagegBtn">
            랭킹
          </button>
        </Link>
        <Link to="/">
          <button id="cafereview" className="cafereviewPagewBtn">
            카페리뷰
          </button>
        </Link>
        <Link to="/">
          <button id="randomcoffee" className="randomPageBtn">
            오늘 뭐마셔?
          </button>
        </Link>
        <div className='container'>
          <img className='personicon' src={person} alt="User Icon" />
            {user ? (
              <>
              <UserNickName />
              <button id='logout' className='LogoutPageBtn' onClick={handleLogout}>로그아웃</button>
              </>
            ) : (
              <Link to="/users/login">
                <button id='login' className='LoginPageBtn'>로그인</button>
              </Link>
            )}
        </div>
      </div>
      <Routes>
        <Route path="/add-recipe" element={<AddRecipePage />} />
        <Route path="/recipes/:recipeId" element={<RecipeDetailViewPage />} />
        <Route path="/recipes" element={<RecipeViewPage />} />
        <Route path="/users/login" element={<LoginPage />} />
        <Route path="/users/signup" element={<SignupPage />} />
        <Route path="/users/update" element={<UpdatePage />} />
        {/* 여기에 더 많은 사용자 관련 라우트를 추가할 수 있습니다 */}
      </Routes>
    </div>
  );
}

export default Navbar;
