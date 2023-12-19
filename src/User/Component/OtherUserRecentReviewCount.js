import React, { useState, useEffect } from "react";
import axios from "axios";

function OtherUserRecentReviewCount({ userId }) {
  const [reviewCount, setReviewCount] = useState(0); 

  useEffect(() => {
    console.log("UserRecentReviewCount에서 받은 userId:", userId); 
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("/reviews");
        const userReviews = response.data.filter((review) => review.authorId === userId);

        setReviewCount(userReviews.length); 
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };

    fetchRecipes();
  }, [userId]);

  return (
    <div>
      <p>작성한 리뷰글 : {reviewCount} 개</p>
    </div>
  );
}

export default OtherUserRecentReviewCount;
