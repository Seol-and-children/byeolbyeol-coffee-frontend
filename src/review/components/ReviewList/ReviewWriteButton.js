// ReviewWriteButton.js

import React from 'react';
import { Link } from 'react-router-dom';

const ReviewWriteButton = () => {
  return (
    <Link to="/review-write">
      <button className="write-button">게시글 작성</button>
    </Link>
  );
};

export default ReviewWriteButton;
