import React from "react";
import "./RecipeCard.css";

function RecipeCard({ recipe }) {
  const imageUrl = `http://localhost:8080/recipeimgs/${recipe.photoUrl}`;
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="recipe-card">
      <div className="recipe-card-image">
        <img src={imageUrl} alt={recipe.recipeName} />
      </div>
      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{recipe.recipeName}</h3>
        <p className="recipe-card-franchise">{recipe.franchiseId}</p>
        <div className="recipe-card-info">
          <span className="recipe-card-author">{`By ${recipe.userNickname}`}</span>
          <span className="recipe-card-date">
            {formatDate(recipe.registerTime)}
          </span>
        </div>
        <div className="recipe-card-stats">
          <span className="recipe-card-likes">{`${recipe.likesCount}`}</span>
          <span className="recipe-card-views">{`${recipe.viewsCount}`}</span>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
