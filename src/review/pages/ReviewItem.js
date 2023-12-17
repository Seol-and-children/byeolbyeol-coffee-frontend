// ReviewItem.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

import PostTitle from '../components/ReviewItem/PostTitle';
import EditButton from '../components/ReviewItem/EditButton';
import LikeButton from "../components/ReviewItem/LikeButton";
import CommentBox from '../components/Comment/CommentBox';
import CommentWrite from '../components/Comment/CommentWrite';

import '../css/ReviewItem.css';

function ReviewItem() {
  const { reviewId } = useParams();
  const [review, setReview] = useState(null);
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/reviews/${reviewId}`
        );
  
        // userNickname을 함께 가져오도록 수정
        const { userNickname, ...reviewDetails } = response.data;
        setReview({
          ...reviewDetails,
          userNickname: userNickname, // 유저 닉네임이 없을 경우 '익명'으로 설정
        });
  
        // 좋아요 상태 확인 요청 추가
        const likeStatusResponse = await axios.get(
          `http://localhost:8080/reviews/${reviewId}/likes/status`,
        );
        setIsLiked(likeStatusResponse.data);
      } catch (error) {
        console.error("데이터 로딩 중 오류 발생:", error);
      }
    };
  
    fetchReviewDetails();
  }, [reviewId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/reviews/${reviewId}`);
      navigate("/reviews");
    } catch (error) {
      console.error("리뷰 삭제 실패:", error);
    }
  };

  const toggleLike = async () => {
    try {
      await axios.post(`http://localhost:8080/reviews/${reviewId}/likes`, {
        userId: 4,
      });
      setIsLiked(!isLiked);
      setReview((prevReview) => ({
        ...prevReview,
        likesCount: isLiked
          ? prevReview.likesCount - 1
          : prevReview.likesCount + 1,
      }));
    } catch (error) {
      console.error("리뷰 좋아요 실패:", error);
    }
  };

  if (!review) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="review-container">
      <h1>CAFE REVIEW</h1>
      <div className="button-group edit-buttons">
        <EditButton />
        <button onClick={handleDelete}>삭제</button>
      </div>
      <div className="divider"></div>
      <h2>{review.reviewName}</h2>
      <div className="review-info">
        <p className="date">{formatDate(review.registerTime)}</p>
        <p className="author">{review.userNickname}</p>
      </div>
      <div className="divider"></div>
      <div className="image-container">
        <img
          className="review-image"
          src={`http://localhost:8080/recipeimgs/${review.photoUrl}`}
          alt={review.reviewName}
        />
      </div>
      <p className="review-content description">{review.content}</p>
      <div className="like-container">
        <LikeButton isLiked={isLiked} toggleLike={toggleLike} />
        <p className="like-count">추천수: {review.likesCount}</p>
      </div>

      <CommentBox review={review} />
      <CommentWrite review={review} />
      <div className="button-group">
        <button onClick={() => navigate('/reviews')}>목록</button>
      </div>
    </div>
  );
};

export default ReviewItem;