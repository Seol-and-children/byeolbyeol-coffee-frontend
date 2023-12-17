import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import RecipeGrid from "../components/recipe/RecipeGrid";
import Pagination from "../components/common/Pagination";
import FranchiseFilter from "../components/recipe/FranchiseFilter";
import "./RecipeViewPage.css";
import { useSelector } from "react-redux";
import SortIcon from "../assets/Sort.svg";

function RecipeViewPage() {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(12);
  const [sortOrder, setSortOrder] = useState("time");
  const [franchises, setFranchises] = useState([]);
  const [selectedFranchise, setSelectedFranchise] = useState(null);
  const [showSortMenu, setShowSortMenu] = useState(false);
  const user = useSelector((state) => state.user.userData);
  const navigate = useNavigate();

  const fetchRecipes = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:8080/recipes");
      let fetchedRecipes = response.data;

      let sortedRecipes;
      switch (sortOrder) {
        case "recommend":
          sortedRecipes = [...fetchedRecipes].sort(
            (a, b) => b.likesCount - a.likesCount
          );
          break;
        case "old":
          sortedRecipes = [...fetchedRecipes].sort(
            (a, b) => new Date(a.registerTime) - new Date(b.registerTime)
          );
          break;
        case "time":
        default:
          sortedRecipes = [...fetchedRecipes].sort(
            (a, b) => new Date(b.registerTime) - new Date(a.registerTime)
          );
          break;
      }

      if (selectedFranchise) {
        sortedRecipes = sortedRecipes.filter(
          (recipe) => recipe.franchiseName === selectedFranchise
        );
      }

      setRecipes(sortedRecipes);
    } catch (error) {
      console.error("레시피 정보를 가져오는데 실패했습니다 :", error);
    }
  }, [sortOrder, selectedFranchise]);

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
    setShowSortMenu(false);
    setSortOrder(order);
    setCurrentPage(1);

    if (order === "recommend") {
      sortByRecommendation();
    } else if (order === "time") {
      sortByTime();
    } else if (order === "old") {
      sortByOld();
    }
  };

  const handleSelectFranchise = (franchise) => {
    if (selectedFranchise === franchise) {
      setSelectedFranchise(null);
    } else {
      setSelectedFranchise(franchise);
    }
    setCurrentPage(1);
    fetchRecipes();
  };

  const handleAddRecipe = () => {
    if (!user) {
      alert("레시피 등록을 위해서는 로그인이 필요합니다.");
      navigate("/users/login");
      return;
    }
    navigate("/add-recipe");
  };

  useEffect(() => {
    fetchRecipes();
    fetchFranchises();
    const handleClickOutside = (event) => {
      if (showSortMenu && !event.target.closest(".sort-button-container")) {
        setShowSortMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [fetchRecipes, selectedFranchise, showSortMenu]);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="recipe-view-page">
      <div className="grid-with-buttons">
        <FranchiseFilter
          franchises={franchises}
          onSelectFranchise={handleSelectFranchise}
          selectedFranchise={selectedFranchise}
        />
        <RecipeGrid recipes={currentRecipes} />
        {currentRecipes.length === 0 && (
          <p className="no-recipes-message">
            {selectedFranchise
              ? `${selectedFranchise} 레시피가 없습니다.`
              : "레시피가 없습니다."}
          </p>
        )}
        <div className="buttons">
          <div className="sort-button-container">
            <button className="sort-button" onClick={toggleSortMenu}>
              <img src={SortIcon} alt="정렬"></img>
              정렬
            </button>
            {showSortMenu && (
              <div className="sort-menu">
                <button
                  className={`sort-option ${
                    sortOrder === "time" ? "active" : ""
                  }`}
                  onClick={() => handleSortChange("time")}
                >
                  최신순
                </button>
                <button
                  className={`sort-option ${
                    sortOrder === "old" ? "active" : ""
                  }`}
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
            레시피 올리기
          </button>
        </div>
      </div>

      <Pagination
        recipesPerPage={recipesPerPage}
        totalRecipes={recipes.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}

export default RecipeViewPage;
