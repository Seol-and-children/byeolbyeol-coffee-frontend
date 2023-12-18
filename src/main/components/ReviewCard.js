import React from "react";
import { useNavigate } from "react-router-dom";
import "./ReviewCard.css";

function ReviewCard({ review, rank }) {
  const navigate = useNavigate();
  const imageUrl = `http://localhost:8080/recipeimgs/${review.photoUrl}`;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleClick = () => {
    navigate(`/reviews/${review.reviewId}`);
  };

  return (
    <div className="review-card" onClick={handleClick}>
      <div className="review-card-container">
        <div className="review-card-image">
          <img src={imageUrl} alt={review.reviewName} />
        </div>
        <div className="review-card-details">
          <h3 className="review-card-title">{review.reviewName}</h3>
          <div className="review-card-content">{review.content}</div>
          <div className="review-card-info">
            <span className="review-card-date">{formatDate(review.registerTime)}</span>
          </div>
          <div className="review-card-stats">
            <div className="counts">
              <span className="review-card-likes">{`추천 ${review.likesCount}`}</span>
              <span className="review-card-views">{`조회 ${review.viewsCount}`}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
