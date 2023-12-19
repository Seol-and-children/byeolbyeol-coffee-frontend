import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import PostTitle from "../components/ReviewWrite/PostTitle";
import CancelButton from "../components/ReviewWrite/CancelButton";
import SubmitButton from "../components/ReviewWrite/SubmitButton";

import "../css/ReviewWrite.css";

function ReviewEdit({ reviewId }) {
  const [review, setReview] = useState(null);
  const [reviewName, setReviewName] = useState("");
  const [content, setContent] = useState("");
  const [reviewImage, setReviewImage] = useState(null);
  const user = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/reviews/${reviewId}`
        );
        const existingReview = response.data;
        setReview(existingReview);
        setReviewName(existingReview.reviewName);
        setContent(existingReview.content);
      } catch (error) {
        console.error("데이터 로딩 중 오류 발생:", error);
      }
    };

    fetchReviewDetails();
  }, [reviewId]);

  const handleTitleChange = (title) => {
    setReviewName(title);
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleImageChange = (e) => {
    setReviewImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Update review logic here...

    alert("리뷰가 수정되었습니다!");
    navigate(`/reviews/${reviewId}`);
  };

  return (
    <div className="all">
      <form onSubmit={handleSubmit}>
        <PostTitle className="post-title" />
        <div className="new-post-title">
          <input
            type="text"
            value={reviewName}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="제목을 입력하세요"
          />
        </div>
        <div className="content">
          {/* Similar to ReviewWrite component, handle image and content */}
          {/* ... */}
        </div>
        <div className="button-container">
          <CancelButton />
          <SubmitButton onSubmit={handleSubmit} />
        </div>
      </form>
    </div>
  );
}

export default ReviewEdit;
