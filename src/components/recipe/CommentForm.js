import React, { useState } from "react";
import axios from "axios";

const CommentForm = ({
  recipeId,
  userId,
  parentId = null,
  existingComment = "",
  onCommentAdded,
}) => {
  const [content, setContent] = useState(existingComment);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { content, userId, recipeId, parentId };
    axios
      .post(`/recipes/${recipeId}/comments`, data)
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
    <form onSubmit={handleSubmit}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        placeholder="댓글을 작성하세요"
      />
      <button type="submit">댓글 작성</button>
    </form>
  );
};

export default CommentForm;
