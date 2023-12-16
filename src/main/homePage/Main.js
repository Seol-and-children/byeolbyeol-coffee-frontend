// Main.js
import React from 'react';
import RecipeCard from '../components/recipe/RecipeCard';
import './Main.css'; // Main 컴포넌트 전용 CSS 파일

const Main = () => {
  // 예제 데이터입니다. 실제 애플리케이션에서는 API에서 데이터를 가져옵니다.
  const todayCoffees = [
    // ... 오늘의 커피 데이터
  ];

  const newRecipes = [
    // ... 새로운 레시피 데이터
  ];

  return (
    <div className="main">
      <div className="section today-coffee">
        <h2>TODAY COFFEE</h2>
        <div className="cards-container">
          {todayCoffees.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
      <div className="section new-recipes">
        <h2>NEW RECIPE</h2>
        <div className="cards-container">
          {newRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
