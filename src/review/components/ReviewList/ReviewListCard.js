import React from "react";
import { useNavigate } from "react-router-dom";
import "../../css/ReviewListCard.css";

function ReviewListCard({ review, rank }) {
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
    <div className="list-review-card" onClick={handleClick}>
      <div className="list-review-card-container">
        <div className="list-review-card-image">
          <img src={imageUrl} alt={review.reviewName} />
        </div>
        <div className="list-review-card-details">
          <h3 className="list-review-card-title">{review.reviewName}</h3>
          <div className="list-review-card-content-box">
            <div className="list-review-card-content">{review.content}</div>
            <hr className="list-hr"/>
            <div className="list-review-card-info">
              <span className="list-review-card-date">{formatDate(review.registerTime)}</span>
              <div className="list-review-card-author">| {review.userNickname}</div>
              <div className="list-review-card-stats">
                <div className="list-count">
                  <span className="list-review-card-likes">{`${review.likesCount}`}</span>
                  <span className="list-review-card-views">{`${review.viewsCount}`}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default ReviewListCard;
