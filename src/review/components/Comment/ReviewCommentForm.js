import React, { useState } from "react";
import axios from "axios";
import "../../../components/recipe/CommentForm.css";

const ReviewCommentForm = ({
  reviewId,
  userId,
  parentId = null,
  existingComment = "",
  onCommentAdded,
}) => {
  const [content, setContent] = useState(existingComment);
  const isReply = parentId != null;
  const placeholderText = isReply
    ? "답글을 입력해주세요"
    : "댓글을 작성해 주세요";
  const formClass = `comment-form ${parentId ? "comment-form-reply" : ""}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { content, userId, reviewId, parentId };
    axios
      .post(`/reviews/${reviewId}/comments`, data)
      .then(() => {
        setContent("");
        onCommentAdded();
      })
      .catch((error) => {
        console.error("댓글 작성 중 오류 발생:", error);
        alert("댓글 작성에 실패하였습니다. 다시 시도해주세요.");
      });
  };

  return (
    <form onSubmit={handleSubmit} className={formClass}>
      <textarea
        className="comment-textarea"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        placeholder={placeholderText}
      />
      <div className="comment-submit-area">
        <button type="submit" className="comment-submit-button">
          등록
        </button>
      </div>
    </form>
  );
};

export default ReviewCommentForm;
