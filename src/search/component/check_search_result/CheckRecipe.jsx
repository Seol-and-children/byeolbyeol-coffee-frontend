import React, { useEffect, useState } from "react";
import FranchiseLogo from "../../../admin/franchise/component/FranchiseLogo";
import axios from "axios";
import TimeLoad from "./TimeLoad";

const CheckRecipe = ({ data }) => {
  const [recipes, setRecipes] = useState([]);
  const [time, setTime] = useState([]);

  useEffect(() => {
    // Axios를 사용하여 데이터를 가져오는 부분(Get)
    axios
      .get(`/search/recipe/recipename/${data}`) // 엔드포인트 수정
      .then((response) => {
        setRecipes(
          response.data.sort((a, b) => b.recipeId - a.recipeId).slice(0, 10)
        );
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [data]);

  const handleFranchiseClick = (recipeId) => {
    // 페이지 이동과 함께 새로고침
    window.location.href = `/recipes/${recipeId}`;
  };

  return (
    <div>
      <div className="bar-title">레시피 {recipes.length}건</div>
      <hr></hr>
      {recipes.map((recipe) => (
        <div key={recipe.recipeId}>
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
                    <div className="search-time"><TimeLoad date={recipe.registerTime}/>&nbsp;&nbsp;&nbsp;|&nbsp;</div>
                    <div className="search-name">
                      {recipe.author.userNickname}
                    </div>
                  </div>
                  <div className="search-right">
                    <div className="search-like-count">
                    <img className="small-image" src={'/images/good.png'}/>{recipe.likesCount}&nbsp;&nbsp;
                    </div>
                    <div className="search-view-count">
                    <img className="small-image" src={'/images/see.png'}/>{recipe.viewsCount}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckRecipe;
