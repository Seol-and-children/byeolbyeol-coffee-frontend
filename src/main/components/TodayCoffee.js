import React, { useRef, useEffect, useState } from "react";
import RecipeCard from "../../components/recipe/RecipeCard";
import axios from "axios";
import "./RecipeFlex.css";

function TodayCoffee() {
  const containerRef = useRef(null);
  const [randomRecipes, setRandomRecipes] = useState([]);

  const fetchRandomRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/recipes");
      const recipes = response.data;

      // 랜덤하게 섞기
      const shuffledRecipes = recipes.sort(() => Math.random() - 0.5);

      // 원하는 개수만큼 선택
      const numberOfRandomRecipes = 5; // 변경 가능
      const selectedRandomRecipes = shuffledRecipes.slice(
        0,
        numberOfRandomRecipes
      );

      setRandomRecipes(selectedRandomRecipes);
    } catch (error) {
      console.error("레시피 목록을 가져오는데 실패했습니다:", error);
    }
  };

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

  useEffect(() => {
    // 컴포넌트가 처음 로드될 때 랜덤 레시피를 가져옴
    fetchRandomRecipes();
  }, []);

  return (
    <div className="recipe-flex-container">
      <h2 className="title">오늘의 커피</h2>
      <div className="recipe-flex" ref={containerRef}>
        {randomRecipes.map((recipe, index) => (
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
