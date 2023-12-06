// ReviewContent.js

import React from 'react';

function ReviewContent({ review }) {
  return (
    <div className="review-content">
      <h2>{review?.reviewName}</h2>
      <p>{review?.content}</p>
      {/* 이곳에 필요한 다른 리뷰 정보들을 추가할 수 있습니다. */}
    </div>
  );
}

export default ReviewContent;
