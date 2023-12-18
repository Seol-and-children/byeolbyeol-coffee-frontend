import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import TimeLoad from "../TimeLoad";
import "../../../css/reviewResultStyles.css";
import "../../../css/resultStyles.css";

const ReviewByName = () => {
  const location = useLocation();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search] );
  const data = params.get("data");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    console.log("Received Data:", params);
    // Axios를 사용하여 데이터를 가져오는 부분(Get)
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/search/review/nickname/${data}`); // 엔드포인트 수정
        const userReviews = response.data.sort(
          (a, b) => b.reviewId - a.reviewId
        );
        setReviews(userReviews);
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };

    fetchReviews();
  }, [data, params]);

  const handleReviewNameClick = (reviewId) => {
    // 페이지 이동과 함께 새로고침
    window.location.href = `/reviews/${reviewId}`;
  };

  return (
    <div className="main">sdadasdsd
      <div className="inner-main">
      <div className="RecipeByTitle">
          '<strong>{data}</strong>'을(를) 가진 닉네임의 리뷰 개수:{" "}
          <strong>{reviews.length}</strong>개
        </div>
      <hr></hr>
      <div className="wrap-checkbox">
          <div className="check-box">
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
    </div>
    </div>
          </div>
  );
};


export default ReviewByName;
