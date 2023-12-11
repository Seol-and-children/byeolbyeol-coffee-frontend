import React from "react";
import { useNavigate } from "react-router-dom";
import "./RecipeCard.css";

function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  const imageUrl = `http://localhost:8080/recipeimgs/${recipe.photoUrl}`;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleClick = () => {
    navigate(`/recipes/${recipe.recipeId}`);
  };

  return (
    <div className="recipe-card" onClick={handleClick}>
      <div className="recipe-card-image">
        <img src={imageUrl} alt={recipe.recipeName} />
      </div>
      <div className="recipe-card-content">
        <p className="recipe-card-franchise">{recipe.franchiseName}</p>
        <h3 className="recipe-card-title">{recipe.recipeName}</h3>
        <div className="recipe-card-info">
          <span className="recipe-card-author">{`| ${recipe.userNickname}`}</span>
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
