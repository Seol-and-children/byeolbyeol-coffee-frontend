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
  // 개별 리뷰 상태를 관리하기 위한 useState 훅
  const [review, setReview] = useState(null);

  // 개별 리뷰 데이터를 가져오는 함수
  const fetchReview = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/reviews/${reviewId}`);
    console.log("리뷰 정보:", response.data);
    setReview(response.data);
  } catch (error) {
    console.error("개별 리뷰 정보를 가져오는데 실패했습니다 :", error);
    console.log("에러 내용:", error.response); // 추가된 부분
  }
};

  // 컴포넌트가 마운트될 때 데이터를 가져오는 useEffect 훅
  useEffect(() => {
    fetchReview();
  }, [reviewId]);

  if (!review) {
    // 리뷰 데이터가 로딩 중일 때의 처리
    return <div>Loading...</div>;
  }

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
        <CommentBox review={review} />
        <CommentWrite review={review} />
      </div>
    </div>
  );
};

export default ReviewItem;
