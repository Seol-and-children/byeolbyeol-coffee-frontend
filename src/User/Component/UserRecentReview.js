import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./UserRecentReview.module.css";

function UserRecentReview({ userId }) {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const userData = JSON.parse(sessionStorage.getItem("userData"));
        const userId = userData.userId;

        const response = await axios.get("/reviews");
        const userReviews = response.data
          .filter((review) => review.authorId === userId)
          .sort((a, b) => b.reviewId - a.reviewId) 
          .slice(0, 3);

        console.log("Sorted and Filtered Reviews:", userReviews);

        setReviews(userReviews);
      } catch (error) {
        console.error("Error fetching reviews", error);
      }
    };

    fetchReviews();
  }, [userId]);

  const handleClick = (reviewId) => { 
    navigate(`/reviews/${reviewId}`);
  };

  return (
    <div>
      <ul>
        {reviews.map((review) => ( 
          <li
            key={review.reviewId} 
            onClick={() => handleClick(review.reviewId)} 
            className={styles.reviewItem} 
          >
            <article>
              <p className={styles.reviewName}> • {review.reviewName}</p>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserRecentReview;