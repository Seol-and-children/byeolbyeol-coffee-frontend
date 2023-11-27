import React from "react";
import RecipeCard from "./RecipeCard";
import "./RecipeCard.css"; // CSS 파일을 import 합니다.

function RecipeGrid({ recipes }) {
  return (
    <div className="recipe-grid">
      {recipes.map((recipe, index) => (
        // Key는 각 요소를 식별할 수 있는 고유한 값이어야 합니다.
        // 데이터에 고유 ID가 있다면 index 대신 해당 ID를 사용하는 것이 좋습니다.
        <RecipeCard key={index} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeGrid;
