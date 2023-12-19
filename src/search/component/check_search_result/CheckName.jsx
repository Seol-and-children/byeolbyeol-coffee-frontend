import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../css/userResultStyles.css";

const CheckName = ({ data }) => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    // Axios를 사용하여 데이터를 가져오는 부분(Get)
    const fetchNames = async () => {
      try {
        const response = await axios.get(`/search/user/${data}`); // 엔드포인트 수정
        const userNames = response.data
          .sort((a, b) => b.userId - a.userId)
          setNames(userNames);
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };
    fetchNames();
  }, [data]);

  const handleRecipeNameClick = (userId) => {
    // 페이지 이동과 함께 새로고침
    window.location.href = `/users/${userId}`;
  };

  return (
    <div>
      <div>
        <div className="bar-title">닉네임 {names.length}건</div>
        <hr></hr>
        {names.map((user) => (
          <div className="user-sample-wrap">
            <div onClick={() => handleRecipeNameClick(user.userId)} className="user-sample-box">
              <div className="user-nickname">{user.userNickName}</div>
              {user.userBio !== null && (
                <div className="user-bio">{user.userBio}</div>)}
                {user.userBio === null && (
                <div className="user-bio">자기소개가 없습니다...</div>)}
            </div>
          </div>
        ))}      
      </div>
    </div>
  );
};

export default CheckName;
