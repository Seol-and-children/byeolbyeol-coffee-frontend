import React, { useRef } from "react";

import ReviewCard from "./ReviewCard";
import "./TodayReview.css";

function TodayReview({ reviews }) {
  const containerRef = useRef(null);

  return (
    <div className="review-flex-container">
      <div className="main-title">오늘의 리뷰</div>
      <div className="review-flex" ref={containerRef}>
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </div>
  );
}

export default TodayReview;
