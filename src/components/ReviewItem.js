// ReviewItem.js
import React, { useState } from 'react';

const ReviewItem = ({ review }) => {
  const [isEditing, setEditing] = useState(false);
  const [comment, setComment] = useState('');

  const handleEdit = () => {
    setEditing(true);
  };

  const handleDelete = () => {
    // 삭제 동작 추가
  };

  const handleCommentSubmit = () => {
    // 댓글 등록 동작 추가
  };

  return (
    <div>
      <h2>CAFE REVIEW</h2>
      <div className="review-actions">
        <button onClick={handleEdit}>수정</button>
        <button onClick={handleDelete}>삭제</button>
      </div>
      <hr />
      <h3>{review.title}</h3>
      <hr />
      <p>작성자: {review.author}</p>
      <hr />
      <div>
        {review.content}
        {/* 사진을 표시하는 부분 */}
      </div>
      <div className="like-section">
        <button>추천</button>
        <span>{review.likes}</span>
      </div>
      <div className="comments-section">
        <div className="comment-box">
          <h4>댓글</h4>
          <hr />
          <textarea
            placeholder="댓글을 입력하세요"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={handleCommentSubmit}>등록</button>
        </div>
        {/* 댓글 목록 표시 */}
      </div>
      <div className="back-to-list">
        {/* 리뷰 리스트로 돌아가는 목록 버튼 */}
        <button>리뷰 리스트로 돌아가기</button>
      </div>
    </div>
  );
};

export default ReviewItem;
