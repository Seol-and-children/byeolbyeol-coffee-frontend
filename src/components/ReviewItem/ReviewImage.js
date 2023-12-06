// ReviewImage.js

import React from 'react';

function ReviewImage({ review }) {
  // 만약 review 객체 또는 imageFileName 속성이 없을 경우에 대한 기본값 설정
  const imageUrl = `http://localhost:8080/reviewimgs/${review?.imageFileName || 'defaultImageFileName.jpg'}`;

  return (
    <div className="review-image">
      <img src={imageUrl} alt={review?.reviewName} />
    </div>
  );
}

export default ReviewImage;