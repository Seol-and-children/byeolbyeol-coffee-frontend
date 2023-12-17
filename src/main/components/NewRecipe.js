import React, { useRef } from "react";
import RecipeCard from "../../components/recipe/RecipeCard";
import "./RecipeFlex.css";

function TodayCoffee({ recipes }) {
  const containerRef = useRef(null);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 322;
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 322;
    }
  };

  return (
    <div className="recipe-flex-container">
      <div className="main-title">새로운 레시피</div>
      <div className="recipe-flex" ref={containerRef}>
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
      <div className="scroll-buttons">
        <button
          className="scroll-button scroll-button-left"
          onClick={handleScrollLeft}
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button
          className="scroll-button scroll-button-right"
          onClick={handleScrollRight}
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>
    </div>
  );
}

export default TodayCoffee;
