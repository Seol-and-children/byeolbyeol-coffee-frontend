import React from 'react';

const ReviewContent = ({ reviews }) => {
  console.log('Reviews Data:', reviews); // 데이터 확인용 로그

  // reviews가 존재하고, reviewName 속성이 존재할 때에만 데이터 출력
  if (!reviews || typeof reviews.reviewName === 'undefined') {
    return <div className="review-content">No Review available</div>;
  }

  return (
    <div className="review-content">
      <h2>{reviews.reviewName}</h2>
      <p>{reviews.content}</p>
    </div>
  );
};

export default ReviewContent;
