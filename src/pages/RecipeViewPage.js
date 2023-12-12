import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RecipeGrid from "../components/recipe/RecipeGrid";
import Pagination from "../components/common/Pagination";
import "./RecipeViewPage.css";
import FranchiseFilter from "../components/recipe/FranchiseFilter";

function RecipeViewPage() {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(12);
  const [sortOrder, setSortOrder] = useState("time");
  const [franchises, setFranchises] = useState([]);
  const [selectedFranchise, setSelectedFranchise] = useState(null);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const navigate = useNavigate();

  // 레시피 데이터를 가져오는 함수
  const fetchRecipes = async () => {
    try {
      const response = await axios.get("http://localhost:8080/recipes");
      let sortedRecipes = response.data.sort(
        (a, b) => new Date(b.registerTime) - new Date(a.registerTime)
      );

      // 프랜차이즈 필터링
      if (selectedFranchise) {
        sortedRecipes = sortedRecipes.filter(
          (recipe) => recipe.franchiseName === selectedFranchise
        );
      }

      setRecipes(sortedRecipes);
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

  const toggleSortMenu = () => {
    setShowSortMenu(!showSortMenu);
  };

  // 추천순으로 정렬하는 함수
  const sortByRecommendation = () => {
    const sortedRecipes = [...recipes].sort(
      (a, b) => b.likesCount - a.likesCount
    );
    setRecipes(sortedRecipes);
  };

  // 시간순으로 정렬하는 함수 (최신순)
  const sortByTime = () => {
    const sortedRecipes = [...recipes].sort(
      (a, b) => new Date(b.registerTime) - new Date(a.registerTime)
    );
    setRecipes(sortedRecipes);
  };

  // 오래된순으로 정렬하는 함수
  const sortByOld = () => {
    const sortedRecipes = [...recipes].sort(
      (a, b) => new Date(a.registerTime) - new Date(b.registerTime)
    );
    setRecipes(sortedRecipes);
  };

  // 정렬 상태 변경 함수
  const handleSortChange = (order) => {
    setShowSortMenu(false); // 정렬 메뉴를 닫습니다.
    setSortOrder(order); // 정렬 순서 상태를 변경합니다.

    if (order === "recommend") {
      sortByRecommendation(); // 추천순으로 정렬합니다.
    } else if (order === "time") {
      sortByTime(); // 최신순으로 정렬합니다.
    } else if (order === "old") {
      sortByOld(); // 오래된순으로 정렬하는 함수를 호출합니다.
    }
  };

  const handleSelectFranchise = (franchise) => {
    if (selectedFranchise === franchise) {
      setSelectedFranchise(null); // Deselect if the same franchise is clicked again
    } else {
      setSelectedFranchise(franchise);
    }
    fetchRecipes();
  };

  const handleAddRecipe = () => {
    navigate("/add-recipe"); // 레시피 등록 페이지로 이동
  };

  // 컴포넌트가 마운트될 때 데이터를 가져옵니다.
  useEffect(() => {
    fetchRecipes();
    fetchFranchises();
  }, [selectedFranchise]);

  // 현재 페이지에 맞는 레시피를 계산합니다.
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  // 페이지 변경 핸들러
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="recipe-view-page">
      <FranchiseFilter
        franchises={franchises}
        onSelectFranchise={handleSelectFranchise}
        selectedFranchise={selectedFranchise}
      />
      <RecipeGrid recipes={currentRecipes} /> {}
      <div className="sort-container">
        <button className="sort-button" onClick={toggleSortMenu}>
          정렬
        </button>
        {showSortMenu && (
          <div className="sort-menu">
            <button
              className={`sort-option ${sortOrder === "time" ? "active" : ""}`}
              onClick={() => handleSortChange("time")}
            >
              최신순
            </button>
            <button
              className={`sort-option ${sortOrder === "old" ? "active" : ""}`}
              onClick={() => handleSortChange("old")}
            >
              오래된순
            </button>
            <button
              className={`sort-option ${
                sortOrder === "recommend" ? "active" : ""
              }`}
              onClick={() => handleSortChange("recommend")}
            >
              추천순
            </button>
          </div>
        )}
      </div>
      <button className="add-recipe-button" onClick={handleAddRecipe}>
        레시피 등록
      </button>
      <Pagination
        recipesPerPage={recipesPerPage}
        totalRecipes={recipes.length}
        paginate={paginate}
      />
    </div>
  );
}

export default RecipeViewPage;
