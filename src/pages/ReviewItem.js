import React, { useState, useEffect } from 'react';
import axios from 'axios';

import PostTitle from '../components/ReviewItem/PostTitle';
import AuthorNickname from '../components/ReviewItem/AuthorNickname';
import EditButton from '../components/ReviewItem/EditButton';
import DeleteButton from '../components/ReviewItem/DeleteButton';
import ReviewImage from '../components/ReviewItem/ReviewImage';
import ReviewContent from '../components/ReviewItem/ReviewContent';

const ReviewItem = ({ review, onDelete }) => {
  // 리뷰 상태를 관리하기 위한 useState 훅
  const [reviews, setReviews] = useState([]);

  // 리뷰 데이터를 가져오는 함수
  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:8080/reviews");
      setReviews(response.data);
    } catch (error) {
      console.error("리뷰 정보를 가져오는데 실패했습니다 :", error);
    }
  };

  // 컴포넌트가 마운트될 때 데이터를 가져오는 useEffect 훅
  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div>
      <div className="review-item-container">
        <PostTitle title={review?.reviewName} />
        <AuthorNickname nickname={review?.authorNickname} />
        <div className="action-buttons">
          <EditButton />
          <DeleteButton onDelete={onDelete} />
        </div>
        <ReviewImage review={review} />
        <ReviewContent review={review} />

      </div>
    </div>
  );
};

export default ReviewItem;
