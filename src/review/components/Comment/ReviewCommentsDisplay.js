import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReviewCommentForm from "./ReviewCommentForm";
import "../../../components/recipe/CommentsDisplay.css";
import ReportAdd from "../../../admin/report/component/ReportAdd";
import DeleteIcon from "../../../assets/DeleteIcon.svg";
import CommentIcon from "../../../assets/CommentIcon.svg";

const ReviewCommentsDisplay = ({ reviewId, userId, userRole }) => {
  const [comments, setComments] = useState([]);
  const [showReplyForms, setShowReplyForms] = useState({});
  const navigate = useNavigate();
  const isLoggedIn = userId != null;

  const fetchComments = async () => {
    try {
      const response = await axios.get(`/reviews/${reviewId}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error("댓글 로딩 중 오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [reviewId, fetchComments]);

  const navigateToUserPage = (authorId) => {
    navigate(`/users/${authorId}`);
  };

  const toggleReplyForm = (commentId) => {
    setShowReplyForms((prev) => ({ ...prev, [commentId]: !prev[commentId] }));
  };

  const handleCommentAdded = () => {
    fetchComments();
  };

  const handleDeleteComment = async (commentId) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      try {
        await axios.delete(`/reviews/${reviewId}/comments/${commentId}`);
        fetchComments();
      } catch (error) {
        console.error("댓글 삭제 실패:", error);
        alert("댓글 삭제에 실패했습니다.");
      }
    }
  };

  const renderComments = (parentId = null) => {
    return comments
      .filter((comment) => comment.parentId === parentId)
      .map((comment) => (
        <div
          key={comment.commentId}
          className={`comment ${comment.depth > 0 ? "indent" : ""}`}
        >
          <div className="parent-comment">
            <div className="comment-align-container">
              <p className="comment-author">
                <span onClick={() => navigateToUserPage(comment.userId)}>
                  {comment.userNickname}
                </span>
              </p>
              <div className="comment-button-area">
                {(userRole === 3 || userId === comment.userId) && (
                  <button
                    className="comment-delete"
                    onClick={() => handleDeleteComment(comment.commentId)}
                  >
                    <img src={DeleteIcon} alt="삭제" />
                  </button>
                )}

                {isLoggedIn && comment.depth === 0 && (
                  <button
                    className="reply-button"
                    onClick={() => toggleReplyForm(comment.commentId)}
                  >
                    <img src={CommentIcon} alt="답글" />
                    답글하기
                  </button>
                )}

                {isLoggedIn && userRole !== 3 && comment.userId !== userId && (
                  <div className="action-buttons">
                    <div className="report-button">
                      <ReportAdd addReviewId={comment.reviewId} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <p className="comment-content">{comment.content}</p>
          </div>

          {showReplyForms[comment.commentId] && (
            <ReviewCommentForm
              reviewId={reviewId}
              parentId={comment.commentId}
              userId={userId}
              onCommentAdded={handleCommentAdded}
            />
          )}
          {renderComments(comment.commentId)}
        </div>
      ));
  };

  return <div className="comments-container">{renderComments()}</div>;
};

export default ReviewCommentsDisplay;
