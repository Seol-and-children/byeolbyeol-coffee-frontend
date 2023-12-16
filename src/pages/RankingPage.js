import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeGrid from "../components/recipe/RecipeGrid";
import "./RankingPage.css";

function filterRecipesByDate(recipes, timeRange) {
  const now = new Date();
  return recipes.filter((recipe) => {
    const recipeDate = new Date(recipe.registerTime);
    switch (timeRange) {
      case "weekly":
        // 주간
        return (now - recipeDate) / (1000 * 60 * 60 * 24) <= 7;
      case "monthly":
        // 월간
        return (now - recipeDate) / (1000 * 60 * 60 * 24) <= 30;
      case "yearly":
        // 연간
        return (now - recipeDate) / (1000 * 60 * 60 * 24) <= 365;
      default:
        return true;
    }
  });
}

function RankingPage() {
  const [rankedRecipes, setRankedRecipes] = useState([]);
  const [timeRange, setTimeRange] = useState("weekly");

  useEffect(() => {
    const fetchRankedRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/recipes");
        let filteredRecipes = filterRecipesByDate(response.data, timeRange);
        filteredRecipes.sort((a, b) => b.likesCount - a.likesCount);
        filteredRecipes = filteredRecipes.slice(0, 9);
        setRankedRecipes(filteredRecipes);
      } catch (error) {
        console.error("랭킹 정보를 가져오는데 실패했습니다:", error);
      }
    };

    fetchRankedRecipes();
  }, [timeRange]);

  return (
    <div className="ranking">
      <div className="ranking-buttons">
        <button
          onClick={() => setTimeRange("weekly")}
          className={timeRange === "weekly" ? "active" : ""}
        >
          <div className="ranking-text">주간 랭킹</div>
        </button>
        <button
          onClick={() => setTimeRange("monthly")}
          className={timeRange === "monthly" ? "active" : ""}
        >
          <div className="ranking-text">월간 랭킹</div>
        </button>
        <button
          onClick={() => setTimeRange("yearly")}
          className={timeRange === "yearly" ? "active" : ""}
        >
          <div className="ranking-text">연간 랭킹</div>
        </button>
        <button
          onClick={() => setTimeRange("allTime")}
          className={timeRange === "allTime" ? "active" : ""}
        >
          <div className="ranking-text">역대 랭킹</div>
        </button>
      </div>
      {rankedRecipes.length > 0 ? (
        <RecipeGrid recipes={rankedRecipes} showRanks={true} />
      ) : (
        <p>랭킹에 등록된 레시피가 없습니다.</p>
      )}
    </div>
  );
}

export default RankingPage;
