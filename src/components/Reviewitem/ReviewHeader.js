// CAFE REVIEW와 수정, 삭제 버튼을 표시
import React from 'react';

const ReviewHeader = ({ onEdit, onDelete }) => {
  return (
    <div>
      <h2>CAFE REVIEW</h2>
      <div className="review-actions">
        <button onClick={onEdit}>수정</button>
        <button onClick={onDelete}>삭제</button>
      </div>
    </div>
  );
};

export default ReviewHeader;
