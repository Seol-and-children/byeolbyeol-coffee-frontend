// ReviewList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import PostTitle from '../components/ReviewList/PostTitle';
import ReviewListTable from '../components/ReviewList/ReviewListTable';
import Pagination from '../components/ReviewList/Pagination';
import ReviewWriteButton from '../components/ReviewList/ReviewWriteButton';

import '../css/ReviewList.css';

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 리뷰 데이터를 가져오는 함수
  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:8080/reviews");
      setReviews(response.data);
    } catch (error) {
      console.error("리뷰 정보를 가져오는데 실패했습니다 :", error);
    }
  };

  // 컴포넌트가 마운트될 때 데이터를 가져옵니다.
  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="review-list-container">
      <PostTitle />
      <ReviewListTable reviews={reviews} />
      <div className="pagination-container">
        <Pagination currentPage={currentPage} totalPages={totalPages} />
        <ReviewWriteButton />
      </div>
    </div>
  );
};

export default ReviewList;