import React, { useState, useEffect } from "react";
import axios from "axios";
import TodayCoffee from "./components/TodayCoffee";
import NewRecipe from "./components/NewRecipe";
import TodayReview from "./components/TodayReview";
import "./Main.css";

function Main() {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/recipes");
      setRecipes(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("레시피 정보를 가져오는데 실패했습니다 :", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  // 오늘의 커피
  const randomRecipes = recipes.sort(() => 0.5 - Math.random()).slice(0, 5);

  // 새로운 레시피
  const newRecipes = [...recipes]
    .sort((a, b) => new Date(b.registerTime) - new Date(a.registerTime))
    .slice(0, 5);

  return (
    <div className="main-page">
      <div className="main-container">
        <TodayCoffee recipes={randomRecipes} />
        <NewRecipe recipes={newRecipes} />
      </div>
      <div className="today-review">
        <TodayReview />
      </div>
    </div>
  );
}

export default Main;
