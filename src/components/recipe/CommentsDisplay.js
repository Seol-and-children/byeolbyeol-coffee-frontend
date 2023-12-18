import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentForm from "./CommentForm";

const CommentsDisplay = ({ recipeId, userId }) => {
  const [comments, setComments] = useState([]);
  const [showReplyForms, setShowReplyForms] = useState({});
  const [reloadComments, setReloadComments] = useState(false);

  const toggleReplyForm = (commentId) => {
    setShowReplyForms((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleCommentAdded = () => {
    setReloadComments((prev) => !prev);
  };

  useEffect(() => {
    axios
      .get(`/recipes/${recipeId}/comments`)
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        console.error("댓글 로딩 중 오류 발생:", error);
      });
  }, [recipeId, reloadComments]);

  return (
    <div>
      {comments.map((comment) => (
        <div
          key={comment.commentId}
          style={{ marginLeft: `${comment.depth * 20}px` }}
        >
          <p>{comment.content}</p>
          {comment.depth === 0 && (
            <button onClick={() => toggleReplyForm(comment.commentId)}>
              답변하기
            </button>
          )}
          {showReplyForms[comment.commentId] && (
            <CommentForm
              recipeId={recipeId}
              parentId={comment.commentId}
              userId={userId}
              onCommentAdded={handleCommentAdded}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentsDisplay;
