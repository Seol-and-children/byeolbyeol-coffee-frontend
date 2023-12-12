import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./admin/adminPage/AdminPage";
import SearchResult from "./search/component/SearchResult";
import HomePage from "./main/homePage/HomePage";
import SearchBar from "./search/component/SearchBar";
import Navbar from "./User/Pages/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="top-bar">
        <div className="search-box">
          <SearchBar />
        </div>
      </div>
      <div>
        <Navbar />
      </div>

      <Routes>
        {/* 홈페이지 라우트 */}
        <Route path="/" element={<HomePage />} />

        {/* 검색페이지 라우트 */}
        <Route path="/search/:searchWord" element={<SearchResult />} />

        {/* 어드민페이지 라우트 */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
