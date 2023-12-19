// ReviewItem.js

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import LikeButton from "../components/ReviewItem/LikeButton";
import DeleteIcon from "../../assets/DeleteIcon.svg";
import EditIcon from "../../assets/Edit.svg";
import ListIcon from "../../assets/ListIcon.svg";
import ReviewCommentForm from "../../components/recipe/CommentForm";
import ReviewCommentsDisplay from "../../components/recipe/CommentsDisplay";
import ReportReviewAdd from "../../admin/report/component/ReortReviewAdd";

import "../css/ReviewItem.css";

function ReviewItem() {
  const { reviewId } = useParams();
  const [review, setReview] = useState(null);
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);
  const user = useSelector((state) => state.user.userData);
  const userId = user ? user.userId : null;
  const userRole = user ? user.userRole : null;
  const [reloadComments, setReloadComments] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleCommentChange = () => {
    setReloadComments(!reloadComments);
  };

  useEffect(() => {
    const fetchReviewDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/reviews/${reviewId}`
        );
        setReview(response.data);

        const likeStatusResponse = await axios.get(
          `http://localhost:8080/reviews/${reviewId}/likes/status`,
          { params: { userId } }
        );
        setIsLiked(likeStatusResponse.data);
      } catch (error) {
        console.error("데이터 로딩 중 오류 발생:", error);
      }
    };

    fetchReviewDetails();
  }, [reviewId, userId]);

  const handleDelete = async () => {
    if (userRole === 3 || (userId && review?.authorId === userId)) {
      const confirmDelete = window.confirm("정말로 게시글을 삭제하시겠습니까?");
      if (confirmDelete) {
        try {
          await axios.delete(`http://localhost:8080/reviews/${reviewId}`);
          navigate("/reviews");
        } catch (error) {
          console.error("게시글 삭제 실패:", error);
        }
      }
    } else {
      alert("본인의 게시글만 삭제할 수 있습니다.");
    }
  };

  const navigateToUserPage = () => {
    navigate(`/users/${review?.authorId}`);
  };

  const navigateToEdit = () => {
    navigate(`/edit-review/${reviewId}`);
  };

  const toggleLike = async () => {
    if (userRole === 3) {
      alert("관리자는 좋아요를 누를 수 없습니다.");
      return;
    }

    if (!userId) {
      alert("먼저 로그인해야 합니다.");
      return;
    }

    try {
      await axios.post(`http://localhost:8080/reviews/${reviewId}/likes`, {
        userId: userId,
      });
      setIsLiked(!isLiked);
      setReview((prevReview) => ({
        ...prevReview,
        likesCount: isLiked
          ? prevReview.likesCount - 1
          : prevReview.likesCount + 1,
      }));
    } catch (error) {
      console.error("게시글 좋아요 실패:", error);
    }
  };

  const isAuthor = review && userId && review?.authorId === userId;
  const isLoggedIn = userId != null;

  if (!review) {
    return <div>게시글 불러오는 중...</div>;
  }

  return (
    <div className="review-container">
      <div className="review-header">
        <h1>CAFE REVIEW</h1>
        <div className="buttons">
          {userRole === 2 && isAuthor ? (
            <div>
              <button className="edit-button" onClick={navigateToEdit}>
                수정
                <img src={EditIcon} alt="수정"></img>
              </button>
              <button className="delete-button" onClick={handleDelete}>
                삭제
                <img src={DeleteIcon} alt="삭제"></img>
              </button>
            </div>
          ) : (
            <div className="report-button">
              <ReportReviewAdd addReviewId={review.reviewId} />
            </div>
          )}
        </div>
      </div>

      <div className="review-title-date">
        <h2>{review.reviewName}</h2>
        <p className="register-time">{formatDate(review.registerTime)}</p>
      </div>

      <div className="author-info">
        <p className="user-button" onClick={navigateToUserPage}>
          {review.userNickname}
        </p>
      </div>

      <div className="image-container">
        <img
          className="review-image"
          src={`http://localhost:8080/reviewimgs/${review.photoUrl}`}
          alt={review.reviewName}
        />
      </div>

      <div className="review-content">
        <p>{review.content}</p>
      </div>

      <div className="like-button">
        <div className="like-icon">
          <LikeButton isLiked={isLiked} toggleLike={toggleLike} />
        </div>
        <div className="like-count">{review.likesCount}</div>
      </div>

      <div className="comment-section">
        <div className="comment-view-section">
          <div className="comment-title">댓글</div>
          <div className="comment-display">
            <ReviewCommentsDisplay
              reviewId={reviewId}
              userId={userId}
              userRole={userRole}
              key={reloadComments}
            />
          </div>
        </div>
        {isLoggedIn && (
          <div className="comment-input-section">
            <div className="comment-title">댓글 작성</div>
            <div className="comment-form">
              <ReviewCommentForm
                reviewId={reviewId}
                userId={userId}
                onCommentAdded={handleCommentChange}
              />
            </div>
          </div>
        )}
      </div>

      <div className="list-button">
        <button onClick={() => navigate("/reviews")}>
          <img src={ListIcon} alt="목록"></img>
          목록
        </button>
      </div>
    </div>
  );
}

export default ReviewItem;
