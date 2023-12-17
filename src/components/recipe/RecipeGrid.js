import React from "react";
import RecipeCard from "./RecipeCard";
import "./RecipeGrid.css";

function RecipeGrid({ recipes, showRanks }) {
  return (
    <div className="recipe-grid">
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          rank={showRanks ? index + 1 : null}
        />
      ))}
    </div>
  );
}

export default RecipeGrid;
