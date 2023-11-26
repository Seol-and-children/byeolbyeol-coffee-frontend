// 댓글 목록 표시
import React from 'react';
import CommentItem from './CommentItem';

const CommentBox = ({ comments }) => {
  return (
    <div className="comment-box">
      <h4>댓글</h4>
      <hr />
      {comments.map((comment, index) => (
        <CommentItem key={index} comment={comment} />
      ))}
    </div>
  );
};

export default CommentBox;
