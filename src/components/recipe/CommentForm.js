import React, { useState } from "react";
import axios from "axios";

const CommentForm = ({
  recipeId,
  parentId = null,
  existingComment = "",
  onCommentAdded,
}) => {
  const [content, setContent] = useState(existingComment);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { content, parentId }; // 대댓글인 경우 parentId 포함
    axios
      .post(`/recipes/${recipeId}/comments`, data)
      .then(() => {
        setContent("");
        onCommentAdded();
      })
      .catch((error) => {
        console.error("댓글 작성 중 오류 발생:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit">댓글 작성</button>
    </form>
  );
};

export default CommentForm;
