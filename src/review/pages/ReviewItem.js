// ReviewItem.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PostTitle from '../components/ReviewItem/PostTitle';
import AuthorNickname from '../components/ReviewItem/AuthorNickname';
import EditButton from '../components/ReviewItem/EditButton';
import DeleteButton from '../components/ReviewItem/DeleteButton';
import ReviewImage from '../components/ReviewItem/ReviewImage';
import ReviewContent from '../components/ReviewItem/ReviewContent';
import CommentBox from '../components/Comment/CommentBox';
import CommentWrite from '../components/Comment/CommentWrite';

const ReviewItem = ({ reviewId, onDelete }) => {
  const [reviews, setReviews] = useState();

  // 리뷰 데이터를 가져오는 함수
  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/reviews/${reviewId}`);
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
    <div>
      <div className="review-item-container">
        <PostTitle />
        <AuthorNickname reviews={reviews} />
        <div className="action-buttons">
          <EditButton />
          <DeleteButton onDelete={onDelete} />
        </div>
        <ReviewImage reviews={reviews} />
        <ReviewContent reviews={reviews} />
        <CommentBox reviews={reviews} />
        <CommentWrite reviews={reviews} />
      </div>
    </div>
  );
};

export default ReviewItem;
