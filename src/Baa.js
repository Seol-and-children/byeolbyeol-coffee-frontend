import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./User/pages/LoginPage";
import SignupPage from "./User/pages/SignupPage";

function Baa() {
  return (
    <div>
      <h1>별별 커피 로고</h1>
      <Link to="/recipes">
        <button id="recipe">레시피</button>
      </Link>
      <Link to="/">
        <button id="ranking">랭킹</button>
      </Link>
      <Link to="/">
        <button id="caferivew">카페리뷰</button>
      </Link>
      <Link to="/">
        <button id="drinkcoffee">오늘 뭐마셔?</button>
      </Link>
      <Link to="/users/login">
        <button id="login">로그인</button>
      </Link>
      <Routes>
        <Route path="/users/login" element={<LoginPage />} />
        <Route path="/users/signup" element={<SignupPage />} />
        {/* 여기에 더 많은 사용자 관련 라우트를 추가할 수 있습니다 */}
      </Routes>
    </div>
  );
}

export default Baa;
