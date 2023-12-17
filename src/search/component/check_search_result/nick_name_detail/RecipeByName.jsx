import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import FranchiseLogo from "../../../../admin/franchise/component/FranchiseLogo";
import TimeLoad from "../TimeLoad";

const RecipeByName = () => {
  const location = useLocation();
  const params = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const data = params.get("data");
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    console.log("Received Data:", params);
    // Axios를 사용하여 데이터를 가져오는 부분(Get)
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`/search/recipe/nickname/${data}`); // 엔드포인트 수정
        const userRecipes = response.data.sort(
          (a, b) => b.recipeId - a.recipeId
        );
        setRecipes(userRecipes);
      } catch (error) {
        console.error("Error fetching recipes", error);
      }
    };

    fetchRecipes();
  }, [data, params]);

  const handleFranchiseClick = (recipeId) => {
    window.location.href = `/recipes/${recipeId}`;
  };

  return (
    <div className="main">
      <div className="inner-main">
        <div className="RecipeByTitle">
          '<strong>{data}</strong>'를 가진 닉네임의 개수:{" "}
          <strong>{recipes.length}</strong>개
        </div>
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
      </div>
    </div>
  );
};

export default RecipeByName;
