// 각 댓글
import React from 'react';

const CommentItem = ({ comment }) => {
  return (
    <div>
      <hr />
      <p>{comment.author}: {comment.content}</p>
      <div className="comment-actions">
        <button>답글달기</button>
        <button>신고하기</button>
      </div>
    </div>
  );
};

export default CommentItem;
