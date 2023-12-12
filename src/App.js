import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminPage from './admin/adminPage/AdminPage';
import SearchResult from './search/component/SearchResult';
import HomePage from './main/homePage/HomePage';
import Navbar from './User/pages/Navbar';

function App() {
  return (
    <BrowserRouter>      
      <div>
          <Navbar/>
          </div>
        <Routes>
          {/* 홈페이지 라우트 */}
          <Route path="/" element={<HomePage/>} />

        {/* 검색페이지 라우트 */}
        <Route path="/search/:searchWord" element={<SearchResult />} />

        {/* 어드민페이지 라우트 */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
