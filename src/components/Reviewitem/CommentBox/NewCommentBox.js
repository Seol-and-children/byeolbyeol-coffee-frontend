// 새로운 댓글 작성 폼 표시
import React, { useState } from 'react';

const NewCommentBox = ({ onCommentSubmit }) => {
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = () => {
    onCommentSubmit({ author: '사용자', content: newComment });
    setNewComment('');
  };

  return (
    <div className="new-comment-box">
      <h4>댓글 작성</h4>
      <hr />
      <textarea
        placeholder="댓글을 입력하세요"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button onClick={handleCommentSubmit}>등록</button>
    </div>
  );
};

export default NewCommentBox;
