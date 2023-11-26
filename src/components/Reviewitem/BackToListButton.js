// BackToListButton.js
import React from 'react';

const BackToListButton = ({ onBackToList }) => {
  return (
    <div className="back-to-list">
      <button onClick={onBackToList}>리뷰 리스트로 돌아가기</button>
    </div>
  );
};

export default BackToListButton;
