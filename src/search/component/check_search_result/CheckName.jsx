import React, { useState, useEffect } from "react";
import axios from "axios";
import FranchiseLogo from "../../../admin/franchise/component/FranchiseLogo";
import TimeLoad from "./TimeLoad";

const CheckName = ({ data }) => {
  const [recipes, setRecipes] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Axios를 사용하여 데이터를 가져오는 부분(Get)
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`/search/recipe/nickname/${data}`); // 엔드포인트 수정
        const userRecipes = response.data
          .sort((a, b) => b.recipeId - a.recipeId)
          .slice(0, 5);
        setRecipes(userRecipes);
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`/search/review/nickname/${data}`); // 엔드포인트 수정
        const userReviews = response.data
          .sort((a, b) => b.reviewId - a.reviewId)
          .slice(0, 5);
        setReviews(userReviews);
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };

    fetchRecipes();
    fetchReviews();
  }, [data]);

  const handleRecipeNameClick = (recipeId) => {
    // 페이지 이동과 함께 새로고침
    window.location.href = `/recipes/${recipeId}`;
  };

  const handleReviewNameClick = (reviewId) => {
    // 페이지 이동과 함께 새로고침
    window.location.href = `/reviews/${reviewId}`;
  };

  const handleRecipeMoreSeeClick = (data) => {
    const queryString = new URLSearchParams({ data }).toString();
    // 페이지 이동과 함께 새로고침
    window.location.href = `/moreSee/recipeByName?${queryString}`;
  };

  const handleReviewMoreSeeClick = (data) => {
    const queryString = new URLSearchParams({ data }).toString();
    // 페이지 이동과 함께 새로고침
    window.location.href = `/moreSee/reviewByName?${queryString}`;
  };

  return (
    <div>
      <div>
        <div className="bar-title">닉네임(레시피) 최신 5개까지 표시됩니다.</div>
        <hr></hr>
        {recipes.map((recipe) => (
          <div className="sample-wrap">
            <div className="sample-image">
              <img
                className="sample-image-2"
                src={`/recipeimgs/${recipe.photoUrl}`}
                alt={recipe.recipeName}
              />
            </div>
            <div className="sample-box">
              <div
                className="sample-title"
                onClick={() => handleRecipeNameClick(recipe.recipeId)}
              >
                {recipe.recipeName}&nbsp;&nbsp;
                <div className="search-logo">
                  <FranchiseLogo
                    franchiseInfo={recipe.franchiseCafeVO.franchiseId}
                  />
                </div>
              </div>
              <div className="sample-content-box">
                <div className="sample-content">{recipe.description}</div>
                <div className="sample-info">
                  <div className="search-left">
                    <div className="search-time">
                      <TimeLoad date={recipe.registerTime} />
                      &nbsp;&nbsp;&nbsp;|&nbsp;
                    </div>
                    <div className="search-name">
                      {recipe.author.userNickname}
                    </div>
                  </div>
                  <div className="search-right">
                    <div className="search-like-count">
                      <img
                        className="small-image"
                        src={"/images/good.png"}
                        alt="좋아요"
                      />
                      {recipe.likesCount}&nbsp;&nbsp;
                    </div>
                    <div className="search-view-count">
                      <img
                        className="small-image"
                        src={"/images/see.png"}
                        alt="조회수"
                      />
                      {recipe.viewsCount}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button
          className="moresee-Btn"
          onClick={() => handleRecipeMoreSeeClick(data)}
        >
          더보기
        </button>
      </div>
      <br />
      <br />
      <br />
      <div>
        <div className="bar-title">닉네임(리뷰) / 최신 5개까지 표시됩니다.</div>
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
                  <div className="review-sample-content">{review.content}</div>
                  <div className="review-sample-info">
                    <div className="search-left">
                      <div className="search-time">
                        <TimeLoad date={review.registerTime} />
                        &nbsp;&nbsp;&nbsp;|&nbsp;
                      </div>
                      <div className="search-name">
                        {review.author.userNickname}
                      </div>
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
        <button
          className="moresee-Btn"
          onClick={() => handleReviewMoreSeeClick(data)}
        >
          더보기
        </button>
      </div>
    </div>
  );
};

export default CheckName;
