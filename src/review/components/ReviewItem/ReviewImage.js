// ReviewImage.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

function ReviewImage({ reviews }) {
  const navigate = useNavigate();

  // reviews가 존재하고, photoUrl 속성이 존재할 때에만 imageUrl 생성
  const imageUrl = reviews?.photoUrl
    ? `http://localhost:8080/imgs/${reviews.photoUrl}`
    : '';

  return (
    <div className="review-image">
      {imageUrl && <img src={imageUrl} alt={reviews.reviewName} />}
    </div>
  );
}

export default ReviewImage; // 이 부분이 중요
