// 댓글 목록과 댓글 작성 폼이 포함된 전체 섹션
import React, { useState } from 'react';
import CommentBox from './CommentBox';
import NewCommentBox from './NewCommentBox';

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const handleCommentSubmit = (comment) => {
    setComments([...comments, comment]);
  };

  return (
    <div className="comments-section">
      <CommentBox comments={comments} />
      <NewCommentBox onCommentSubmit={handleCommentSubmit} />
    </div>
  );
};

export default CommentSection;
