// ReviewList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import PostTitle from '../components/ReviewList/PostTitle';
import ReviewListTable from '../components/ReviewList/ReviewListTable';
import Pagination from '../components/ReviewList/Pagination';
import ReviewWriteButton from '../components/ReviewList/ReviewWriteButton';

import '../css/ReviewList.css'; // Import ReviewList.css here

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axios.get(`http://localhost:8080/api/reviews?page=${currentPage}`)
      .then(response => {
        setReviews(response.data.reviews);
        setTotalPages(response.data.totalPages);
      })
      .catch(error => console.error('Error fetching reviews:', error));
  }, [currentPage]);

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