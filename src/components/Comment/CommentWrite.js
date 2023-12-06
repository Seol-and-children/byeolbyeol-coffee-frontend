// CommentWrite.js

import React, { useState } from 'react';

const CommentWrite = ({ onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    // 댓글 작성 후 처리할 로직을 추가하세요.
    // onSubmit 함수를 통해 상위 컴포넌트에 댓글 내용을 전달할 수 있습니다.
    onSubmit(comment);

    // 댓글 작성 후 입력창 초기화
    setComment('');
  };

  return (
    <div className="comment-write-container">
      <h3>댓글 작성</h3>
      <textarea
        placeholder="댓글을 작성해주세요."
        value={comment}
        onChange={handleCommentChange}
        className="comment-input"
      />
      <button onClick={handleSubmit} className="submit-button">
        등록
      </button>
    </div>
  );
};

export default CommentWrite;
