import React, { useState, useEffect } from "react";
import axios from "axios";
import FranchiseLogo from "../../../admin/franchise/component/FranchiseLogo";
import TimeLoad from "./TimeLoad";

const CheckName = ({ data }) => {
  const [recipes, setRecipes] = useState([]);

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

    fetchRecipes();
  }, [data]);

  const handleFranchiseClick = (recipeId) => {
    // 페이지 이동과 함께 새로고침
    window.location.href = `/recipes/${recipeId}`;
  };

  const handleMoreSeeClick = (data) => {
    const queryString = new URLSearchParams({ data }).toString();
    // 페이지 이동과 함께 새로고침
    window.location.href = `/moreSee/recipeByName?${queryString}`;
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
                onClick={() => handleFranchiseClick(recipe.recipeId)}
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
                      <img className="small-image" src={"/images/good.png"} />
                      {recipe.likesCount}&nbsp;&nbsp;
                    </div>
                    <div className="search-view-count">
                      <img className="small-image" src={"/images/see.png"} />
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
          onClick={() => handleMoreSeeClick(data)}
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
                onClick={() => handleFranchiseClick(recipe.recipeId)}
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
                      <img className="small-image" src={"/images/good.png"} />
                      {recipe.likesCount}&nbsp;&nbsp;
                    </div>
                    <div className="search-view-count">
                      <img className="small-image" src={"/images/see.png"} />
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
          onClick={() => handleMoreSeeClick(data)}
        >
          더보기
        </button>
      </div>
    </div>
  );
};

export default CheckName;
