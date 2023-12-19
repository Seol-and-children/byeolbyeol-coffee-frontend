import React, { useEffect, useState } from "react";
import "../../css/reviewResultStyles.css";
import axios from "axios";
import TimeLoad from "./TimeLoad";

const CheckReview = ({ data }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Axios를 사용하여 데이터를 가져오는 부분(Get)
    axios
      .get(`/search/review/reviewname/${data}`) // 엔드포인트 수정
      .then((response) => {
        setReviews(
          response.data.sort((a, b) => b.reviewId - a.reviewId).slice(0, 10)
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [data]);

  const handleReviewNameClick = (reviewId) => {
    // 페이지 이동과 함께 새로고침
    window.location.href = `/reviews/${reviewId}`;
  };

  return (
    <div>
      <div className="bar-title">리뷰 {reviews.length}건</div>
      <hr></hr>
      {reviews.map((review) => (
        <div key={review.reviewId}>
          <div className="sample-wrap">
            <div className="review-sample-box">
              <div
                className="sample-title"
                onClick={() => handleReviewNameClick(review.reviewId)}
              >
                {review.reviewName}
              </div>
              <div className="review-sample-content-box">
                <div className="review-sample-content">
                  {review.content}
                </div>
                <div className="review-sample-info">
                  <div className="search-left">
                    <div className="search-time">
                      <TimeLoad date={review.registerTime} />
                      &nbsp;&nbsp;&nbsp;|&nbsp;
                    </div>
                    <div className="search-name">{review.author.userNickname}</div>
                  </div>
                  <div className="search-right">
                    <div className="search-like-count">
                      <img
                        className="small-image"
                        src={"/images/good.png"}
                        alt="좋아요"
                      />
                      {review.likesCount}&nbsp;&nbsp;
                    </div>
                    <div className="search-view-count">
                      <img
                        className="small-image"
                        src={"/images/see.png"}
                        alt="조회수"
                      />
                      {review.viewsCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default CheckReview;
