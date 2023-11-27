import React, { useState, useEffect } from "react";
import axios from "axios";
import RecipeGrid from "../components/recipe/RecipeGrid";
import Pagination from "../components/common/Pagination";
import "./RecipeViewPage.css";

function RecipeViewPage() {
  const [recipes, setRecipes] = useState([]); // 레시피 데이터를 위한 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [recipesPerPage] = useState(12); // 페이지 당 레시피 수

  // 레시피 데이터를 가져오는 함수
  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/recipes");
      setRecipes(response.data);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  };

  // 컴포넌트가 마운트될 때 데이터를 가져옵니다.
  useEffect(() => {
    fetchRecipes();
  }, []);

  // 현재 페이지에 맞는 레시피를 계산합니다.
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // 페이지 변경 핸들러
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="recipe-view-page">
      <RecipeGrid recipes={currentRecipes} /> {/* 레시피 그리드 */}
      <Pagination
        recipesPerPage={recipesPerPage}
        totalRecipes={recipes.length}
        paginate={paginate}
      />{" "}
      {/* 페이지네이션 */}
      {/* 여기에 정렬 버튼, 레시피 등록 버튼 등 추가 컴포넌트를 배치 */}
    </div>
  );
}

export default RecipeViewPage;
