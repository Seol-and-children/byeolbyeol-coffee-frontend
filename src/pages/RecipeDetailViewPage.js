import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./RecipeDetailViewPage.css";
import LikeButton from "../components/recipe/LikeButton";

function RecipeDetailViewPage() {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/recipes/${recipeId}`
        );
        setRecipe(response.data);

        // 좋아요 상태 확인 요청 추가
        const likeStatusResponse = await axios.get(
          `http://localhost:8080/recipes/${recipeId}/likes/status`,
          {
            params: { userId: 4 }, // 현재 로그인한 사용자 ID
          }
        );
        setIsLiked(likeStatusResponse.data);
      } catch (error) {
        console.error("데이터 로딩 중 오류 발생:", error);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/recipes/${recipeId}`);
      navigate("/recipes");
    } catch (error) {
      console.error("레시피 삭제 실패:", error);
    }
  };

  const toggleLike = async () => {
    try {
      await axios.post(`http://localhost:8080/recipes/${recipeId}/likes`, {
        userId: 4,
      });
      setIsLiked(!isLiked);
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        likesCount: isLiked
          ? prevRecipe.likesCount - 1
          : prevRecipe.likesCount + 1,
      }));
    } catch (error) {
      console.error("레시피 좋아요 실패:", error);
    }
  };

  if (!recipe) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="recipe-detail-view-page">
      <p>{recipe.userNickname}</p>
      <p>{formatDate(recipe.registerTime)}</p>
      <h2>{recipe.recipeName}</h2>
      <button onClick={handleDelete}>삭제</button>
      <img
        src={`http://localhost:8080/recipeimgs/${recipe.photoUrl}`}
        alt={recipe.recipeName}
      />
      <p>프랜차이즈: {recipe.franchiseName}</p>
      <p>
        베이스 음료: {recipe.baseBeverageVO.name} {recipe.baseBeverageVO.size}{" "}
        {recipe.baseBeverageVO.temperature}
      </p>
      <div>
        <p>커스텀 옵션</p>
        <ul>
          {recipe.customOptions.map((option, index) => (
            <li key={index}>
              {option.customOptionId ? (
                <span>
                  {option.ingredientName} --- {option.quantity}
                  {option.ingredientUnit}
                </span>
              ) : (
                <span>옵션 정보를 찾을 수 없음</span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <p>설명: {recipe.description}</p>
      <button onClick={() => navigate("/recipes")}>목록</button>
      <LikeButton isLiked={isLiked} toggleLike={toggleLike} />
      <p>추천수: {recipe.likesCount}</p>
    </div>
  );
}

export default RecipeDetailViewPage;
