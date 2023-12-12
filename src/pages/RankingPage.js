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
        // 현재 날짜에서 7일을 빼서 주간 랭킹을 계산합니다.
        return (now - recipeDate) / (1000 * 60 * 60 * 24) <= 7;
      case "monthly":
        // 현재 날짜에서 한 달을 빼서 월간 랭킹을 계산합니다.
        return (now - recipeDate) / (1000 * 60 * 60 * 24) <= 30;
      case "yearly":
        // 현재 날짜에서 일 년을 빼서 연간 랭킹을 계산합니다.
        return (now - recipeDate) / (1000 * 60 * 60 * 24) <= 365;
      default:
        // 시간 범위가 지정되지 않았다면 모든 레시피를 반환하여 역대 랭킹을 계산합니다.
        return true;
    }
  });
}

function RankingPage() {
  const [rankedRecipes, setRankedRecipes] = useState([]);
  const [timeRange, setTimeRange] = useState("weekly"); // 현재 선택된 랭킹 카테고리 상태

  useEffect(() => {
    const fetchRankedRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:8080/recipes");
        let filteredRecipes = filterRecipesByDate(response.data, timeRange);
        filteredRecipes.sort((a, b) => b.likesCount - a.likesCount);
        setRankedRecipes(filteredRecipes);
      } catch (error) {
        console.error("랭킹 정보를 가져오는데 실패했습니다:", error);
      }
    };

    fetchRankedRecipes();
  }, [timeRange]); // timeRange가 변경될 때마다 랭킹 데이터를 새로 가져옵니다.

  return (
    <div>
      <div className="ranking-buttons">
        <button
          onClick={() => setTimeRange("weekly")}
          className={timeRange === "weekly" ? "active" : ""}
        >
          주간 랭킹
        </button>
        <button
          onClick={() => setTimeRange("monthly")}
          className={timeRange === "monthly" ? "active" : ""}
        >
          월간 랭킹
        </button>
        <button
          onClick={() => setTimeRange("yearly")}
          className={timeRange === "yearly" ? "active" : ""}
        >
          연간 랭킹
        </button>
        <button
          onClick={() => setTimeRange("allTime")}
          className={timeRange === "allTime" ? "active" : ""}
        >
          역대 랭킹
        </button>
      </div>
      {rankedRecipes.length > 0 ? (
        <RecipeGrid recipes={rankedRecipes} />
      ) : (
        <p>랭킹에 등록된 레시피가 없습니다.</p>
      )}
    </div>
  );
}

export default RankingPage;
