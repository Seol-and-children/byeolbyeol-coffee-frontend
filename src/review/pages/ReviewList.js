import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import ReviewListCard from "../components/ReviewList/ReviewListCard";
import ReviewWriteButton from "../components/ReviewList/ReviewWriteButton";
import Pagination from "../components/ReviewList/Pagination";
import "../css/ReviewList.css";

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewsPerPage] = useState(15);
  const containerRef = useRef(null);

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:8080/reviews");
      const sortedReviews = response.data.sort(
        (a, b) => new Date(b.registerTime) - new Date(a.registerTime)
      );
      setReviews(sortedReviews);
    } catch (error) {
      console.error("리뷰 정보를 가져오는데 실패했습니다 :", error);
    }
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 데이터를 가져옵니다.
    fetchReviews();
  }, []);

  return (
    <div className="review-list">
      <div className="review-header">
        <h1>CAFE REVIEW</h1>
      </div>
      <div className="review-flex-container">
        <div className="review-flex" ref={containerRef}>
          {reviews.map((review, index) => (
            <ReviewListCard key={index} review={review} />
          ))}
        </div>
        <div className="review-write-button">
          <ReviewWriteButton />
        </div>
        <Pagination
        reviewsPerPage={reviewsPerPage}
        totalReviews={reviews.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
      </div>
  );
}

export default ReviewList;
