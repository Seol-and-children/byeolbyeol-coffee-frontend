import React, { useState, useEffect } from "react";
import axios from "axios";
import TodayCoffee from "./components/TodayCoffee";
import NewRecipe from "./components/NewRecipe";
import TodayReview from "./components/TodayReview";
import "./Main.css";

function Main() {
  const [recipes, setRecipes] = useState([]);
  const [reviews, setReviews] = useState([]);

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

  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:8080/reviews");
      setReviews(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("게시글 정보를 가져오는데 실패했습니다 :", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
    fetchReviews();
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

  const now = new Date();
  const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000); // 24시간 전

  // 오늘의 레시피
  const bestReview = [...reviews]
    .filter(review => new Date(review.registerTime) >= twentyFourHoursAgo)
    .sort((a, b) => b.likesCount - a.likesCount)
    .slice(0, 1);
    
  return (
    <div className="main-page">
      <div className="main-container">
        <TodayCoffee recipes={randomRecipes} />
        <NewRecipe recipes={newRecipes} />
        <TodayReview reviews={bestReview}/>
      </div>
      <div className="today-review">
        
      </div>
    </div>
  );
}

export default Main;
