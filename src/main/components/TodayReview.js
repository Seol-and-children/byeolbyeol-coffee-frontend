import React, { useRef } from "react";

import ReviewCard from "./ReviewCard";
import "./TodayReview.css";

function TodayReview({ reviews }) {
  const containerRef = useRef(null);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 322;
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 322;
    }
  };

  return (
    <div className="review-flex-container">
      <div className="main-title">오늘의 리뷰</div>
      <div className="review-flex" ref={containerRef}>
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
      <div className="scroll-buttons">
        <button
          className="scroll-button scroll-button-left"
          onClick={handleScrollLeft}
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button
          className="scroll-button scroll-button-right"
          onClick={handleScrollRight}
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  );
}

export default TodayReview;
