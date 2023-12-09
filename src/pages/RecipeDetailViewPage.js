import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./RecipeDetailViewPage.css";

function RecipeDetailViewPage() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/recipes/${recipeId}`
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("레시피 상세 정보를 가져오는데 실패했습니다:", error);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/recipes/${recipeId}`);
      navigate("/recipes"); // 삭제 후 홈이나 레시피 목록 페이지로 리다이렉트
    } catch (error) {
      console.error("레시피 삭제 실패:", error);
    }
  };

  if (!recipe) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="recipe-detail-view-page">
      <h2>{recipe.recipeName}</h2>
      <img
        src={`http://localhost:8080/recipeimgs/${recipe.photoUrl}`}
        alt={recipe.recipeName}
      />
      <p>프랜차이즈: {recipe.franchiseName}</p>
      <p>베이스 음료: {recipe.baseBeverageVO.name}</p>
      <p>커스텀 옵션: {recipe.customOptionId}</p>
      <p>설명: {recipe.description}</p>
      <button onClick={handleDelete}>레시피 삭제</button>
      <button onClick={() => navigate("/recipes")}>
        레시피 목록으로 돌아가기
      </button>
      {/* 필요에 따라 추가 버튼 및 기능을 추가하세요 */}
    </div>
  );
}

export default RecipeDetailViewPage;
