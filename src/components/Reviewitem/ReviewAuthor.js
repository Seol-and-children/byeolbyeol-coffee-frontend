// 리뷰 작성자 표시
import React from 'react';

const ReviewAuthor = ({ author }) => {
  return (
    <div>
      <p>작성자: {author}</p>
      <hr />
    </div>
  );
};

export default ReviewAuthor;

