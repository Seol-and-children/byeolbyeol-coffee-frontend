import React from "react";
import { useNavigate } from "react-router-dom";
import "./RecipeCard.css";
import FranchiseLogo from "../../admin/franchise/component/FranchiseLogo";

function RecipeCard({ recipe, rank }) {
  const navigate = useNavigate();
  const imageUrl = `http://localhost:8080/recipeimgs/${recipe.photoUrl}`;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleClick = () => {
    navigate(`/recipes/${recipe.recipeId}`);
  };

  const renderMedal = () => {
    if (!rank) return null;

    switch (rank) {
      case 1:
        return <div className="medal gold">1위</div>;
      case 2:
        return <div className="medal silver">2위</div>;
      case 3:
        return <div className="medal bronze">3위</div>;
      default:
        return null;
    }
  };

  return (
    <div className="recipe-card" onClick={handleClick}>
      {renderMedal()}
      <div className="recipe-card-image">
        <img src={imageUrl} alt={recipe.recipeName} />
      </div>
      <div className="recipe-card-line"></div>
      <div className="recipe-card-content">
        <p className="recipe-card-franchise">
          <FranchiseLogo franchiseInfo={recipe.franchiseId}></FranchiseLogo>
        </p>
        <h3 className="recipe-card-title">{recipe.recipeName}</h3>
        <div className="recipe-card-info">
          <span className="recipe-card-author">{`| ${recipe.userNickname}`}</span>
        </div>
        <div className="recipe-card-stats">
          <span className="recipe-card-date">
            {formatDate(recipe.registerTime)}
          </span>
          <div className="counts">
            <span className="recipe-card-likes">{`${recipe.likesCount}`}</span>
            <span className="recipe-card-views">{`${recipe.viewsCount}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
