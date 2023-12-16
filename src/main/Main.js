import React, { useState, useEffect } from "react";
import axios from "axios";
import TodayCoffee from "./components/TodayCoffee";
import NewRecipe from "./components/NewRecipe";

function RecipeViewPage() {
  const [recipes, setRecipes] = useState([]);
  const [selectedFranchise, setSelectedFranchise] = useState(null);
  const [franchises, setFranchises] = useState([]);

  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/recipes");
      let fetchedRecipes = response.data;

      if (selectedFranchise) {
        fetchedRecipes = fetchedRecipes.filter(
          (recipe) => recipe.franchiseName === selectedFranchise
        );
      }

      // 최신순으로 정렬
      fetchedRecipes.sort(
        (a, b) => new Date(b.registerTime) - new Date(a.registerTime)
      );

      setRecipes(fetchedRecipes);
    } catch (error) {
      console.error("레시피 정보를 가져오는데 실패했습니다 :", error);
    }
  };

  const fetchFranchises = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/option/franchises"
      );
      setFranchises(response.data);
    } catch (error) {
      console.error("프렌차이즈 정보를 가져오는데 실패했습니다:", error);
    }
  };

  const handleSelectFranchise = (franchise) => {
    setSelectedFranchise(franchise);
  };

  useEffect(() => {
    fetchRecipes();
    fetchFranchises();
  }, [selectedFranchise]);

  
  return (
    <div>
      <div className="today-coffee">
        <TodayCoffee recipes={recipes} />
      </div>
      <div className="new-recipe">
        <NewRecipe recipes={recipes} />
      </div>
    </div>
    
  );
}

export default RecipeViewPage;
