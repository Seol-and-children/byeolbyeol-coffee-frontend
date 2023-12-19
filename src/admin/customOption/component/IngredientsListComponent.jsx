import React, { useEffect, useState } from "react";
import axios from "axios";
import IngredientModalComponent from "./IngredientUpdateModal";
import IngredientAdd from "./IngredientAdd";
import IngredientToggle from "./IngredientToggle";
import Pagination from "../../../components/common/Pagination";
import "../css/styles.css";

const Ingredient = ({ ingredient, onClick }) => (
  <div
    id="ingredient-bar"
    key={ingredient.ingredientId}
    onClick={() => onClick(ingredient)}
  >
    <div class="exam-item ingredient-name">{ingredient.ingredientName}</div>
    <div class="exam-item unit">{ingredient.ingredientUnit}</div>
  </div>
);

const IngredientListComponent = () => {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState(null); // 모달을 표시하는 상태 추가
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(18);

  useEffect(() => {
    axios
      .get("/option/ingredients")
      .then((response) => {
        setIngredients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleIngredientClick = (ingredient) => {
    setSelectedIngredient(ingredient);
  };

  const ToggleUpdate = (ingredientId, updatedProcessing) => {
    setIngredients((prevIngredient) =>
      prevIngredient.map((ingredient) =>
        ingredient.ingredientId === ingredientId
          ? { ...ingredient, processing: updatedProcessing }
          : ingredient
      )
    );
  };

  const handleCloseModal = () => {
    setSelectedIngredient(null);
    //모달이 닫힐때 데이터를 다시 불러온다.
    axios
      .get("/option/ingredients")
      .then((response) => {
        setIngredients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = ingredients.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginaten = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
    <div className="recipe-management">
      <div id="main-ingredient-bar">
        <div class="exam-item ingredient-name">재료이름</div>
        <div class="exam-item unit">단위</div>
        <div class="exam-item remove">사용여부</div>
      </div>
      <div className="inner-ingredient-bar">
        {currentRecipes.map((ingredient) => (
          <div key={ingredient.ingredientId}>
            <div id="ingredient-bar">
              <Ingredient
                ingredient={ingredient}
                onClick={handleIngredientClick}
              />
              <div class="exam-item remove">
                <IngredientToggle
                  ingredientId={ingredient.ingredientId}
                  processing={ingredient.processing}
                  onUpdate={ToggleUpdate}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination
        recipesPerPage={recipesPerPage}
        totalRecipes={ingredients.length}
        paginate={paginaten}
      />
      {/* 모달 */}
      {selectedIngredient && (
        <IngredientModalComponent
          isOpen={selectedIngredient !== null}
          ingredientId={selectedIngredient.ingredientId}
          onClose={handleCloseModal}
        />
      )}
      </div>
      <IngredientAdd onDataUpdate={handleCloseModal} />
    </div>
  );
};

export default IngredientListComponent;
