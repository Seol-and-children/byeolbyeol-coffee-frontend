import React, { useState, useEffect } from "react";
import axios from "axios";
import TodayCoffee from "./components/TodayCoffee";
import NewRecipe from "./components/NewRecipe";
import "./Main.css";

function Main() {
  const [recipes, setRecipes] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/recipes");
      let fetchedRecipes = response.data;

      // 최신순으로 정렬
      fetchedRecipes.sort(
        (a, b) => new Date(b.registerTime) - new Date(a.registerTime)
      );

      setRecipes(fetchedRecipes);
    } catch (error) {
      console.error("레시피 정보를 가져오는데 실패했습니다 :", error);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [recipes]);

  return (
    <div className="main-page">
      <div className="main-container">
        <div className="today-coffee">
          <TodayCoffee recipes={recipes} />
        </div>
        <div className="new-recipe">
          <NewRecipe recipes={recipes} />
        </div>
      </div>
    </div>
  );
}

export default Main;
