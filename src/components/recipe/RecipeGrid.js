import React from "react";
import RecipeCard from "./RecipeCard";
import "./RecipeGrid.css";

function RecipeGrid({ recipes }) {
  return (
    <div className="recipe-grid">
      {recipes.map((recipe, index) => (
        <RecipeCard key={index} recipe={recipe} />
      ))}
    </div>
  );
}

export default RecipeGrid;
