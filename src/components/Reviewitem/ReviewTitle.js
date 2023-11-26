// 리뷰 제목 표시
import React from 'react';

const ReviewTitle = ({ title }) => {
  return (
    <div>
      <hr />
      <h3>{title}</h3>
      <hr />
    </div>
  );
};

export default ReviewTitle;
