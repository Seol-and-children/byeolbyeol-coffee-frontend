import React, { useRef } from "react";
import RecipeCard from "./RecipeCard";
import "./RecipeFlex.css";

function RecipeFlex({ recipes }) {
  const containerRef = useRef(null);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 300;
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 300;
    }
  };

  return (
    <div className="recipe-flex-container">
      <h2>오늘의 커피</h2>
      <div className="recipe-flex" ref={containerRef}>
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
      <div className="scroll-buttons">
        <button className="scroll-button scroll-button-left" onClick={handleScrollLeft}>
          {"<"}
        </button>
        <button className="scroll-button scroll-button-right" onClick={handleScrollRight}>
          {">"}
        </button>
      </div>
    </div>
  );
}

export default RecipeFlex;
