// ReviewList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import PostTitle from '../components/ReviewList/PostTitle';
import ReviewListTable from '../components/ReviewList/ReviewListTable';
import Pagination from '../components/ReviewList/Pagination';

import '../css/ReviewList.css';


const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // 서버에서 리뷰 목록과 총 페이지 수를 가져옵니다.
    axios.get(`http://localhost:8080/api/reviews?page=${currentPage}`)
      .then(response => {
        setReviews(response.data.reviews);
        setTotalPages(response.data.totalPages);
      })
      .catch(error => console.error('Error fetching reviews:', error));
  }, [currentPage]);

  return (
    <div>
      <PostTitle />
      <ReviewListTable reviews={reviews} />
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};

export default ReviewList;
