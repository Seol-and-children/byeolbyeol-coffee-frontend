import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./user/pages/Navbar";
import { useDispatch } from "react-redux";
import { SET_USER_DATA } from "./user/component/Types";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      console.log("세션 스토리지에서 로드한 userData:", userData);
      dispatch({
        type: SET_USER_DATA,
        payload: userData,
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
    </BrowserRouter>
  );
}

export default App;
