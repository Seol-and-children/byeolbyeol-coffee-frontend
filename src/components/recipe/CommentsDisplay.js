import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentForm from "./CommentForm";

const CommentsDisplay = ({ recipeId }) => {
  const [comments, setComments] = useState([]);
  const [showReplyForms, setShowReplyForms] = useState({});

  const toggleReplyForm = (commentId) => {
    setShowReplyForms((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
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
  }, [recipeId]);

  return (
    <div>
      {comments.map((comment) => (
        <div
          key={comment.commentId}
          style={{ marginLeft: `${comment.depth * 20}px` }}
        >
          <p>{comment.content}</p>
          {comment.depth === 0 && ( // 원 댓글인 경우에만 대댓글 버튼 표시
            <button onClick={() => toggleReplyForm(comment.commentId)}>
              답변하기
            </button>
          )}
          {showReplyForms[comment.commentId] && ( // 대댓글 작성 폼 토글
            <CommentForm
              recipeId={recipeId}
              parentId={comment.commentId}
              onCommentAdded={() => {
                toggleReplyForm(comment.commentId);
                // 댓글 목록 갱신
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentsDisplay;
