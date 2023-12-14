import React, { useEffect  } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./admin/adminPage/AdminPage";
import SearchResult from "./search/component/SearchResult";
import HomePage from "./main/homePage/HomePage";
import Navbar from "./user/pages/Navbar";
import SearchBar from "./search/component/SearchBar";
import { useDispatch } from 'react-redux';
import { SET_USER_DATA } from './User/component/Types';


function App() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const storedUserData = sessionStorage.getItem('userData');
    if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        console.log("세션 스토리지에서 로드한 userData:", userData);
        dispatch({
          type: SET_USER_DATA,
          payload: userData
        });
    } else {
        console.log("세션 스토리지에 userData가 없음");
    }
    }, [dispatch]);
  

  return (
    <BrowserRouter>
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
