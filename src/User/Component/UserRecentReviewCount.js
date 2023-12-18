import React, { useState, useEffect } from "react";
import axios from "axios";

function UserRecentPostCount({ userId }) {
  const [reivewCount, setReivewCount] = useState(0); // 레시피 개수 상태

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        const userId = userData.userId;

        const response = await axios.get("/reviews");
        const userReivews = response.data.filter((review) => review.authorId === userId);

        setReivewCount(userReivews.length); // 레시피 개수 설정
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };

    fetchRecipes();
  }, [userId]);

  return (
    <div>
      <p>작성한 리뷰 : {reivewCount} 개</p>
    </div>
  );
}

export default UserRecentPostCount;
