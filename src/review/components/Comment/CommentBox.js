// CommentBox.js

import React from 'react';

const CommentBox = ({ comment }) => {
  // comment가 없으면 null을 반환하여 렌더링을 방지합니다.
  if (!comment) {
    return null;
  }

  const userId = comment?.userId ?? '알 수 없는 사용자';
  const content = comment?.content ?? '내용이 없습니다.';

  return (
    <div className="comment-box">
      <h1>댓글</h1>
      <div className="comment-content">
        <p className="comment-nickname">{userId}</p>
        <p className="comment-text">{content}</p>
      </div>
    </div>
  );
};

export default CommentBox;