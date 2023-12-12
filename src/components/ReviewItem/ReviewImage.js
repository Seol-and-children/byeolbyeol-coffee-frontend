// ReviewImage.js

import { useNavigate } from "react-router-dom";
import React from 'react';

function ReviewImage({ reviews }) {
  const navigate = useNavigate();
  const imageUrl = `http://localhost:8080/imgs/${reviews.photoUrl}`;
  
  return (
    <div className="review-image">
      <img src={imageUrl} alt={reviews.reviewName} />
    </div>
  );
}

export default ReviewImage;