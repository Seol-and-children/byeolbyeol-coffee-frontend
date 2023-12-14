import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";

function EditRecipePage() {
  const { recipeId } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    customOptions: [],
    baseBeverageVO: {},
  });
  const [franchiseCafeList, setfranchiseCafeList] = useState([]);
  const [selectedFranchise, setSelectedFranchise] = useState(null);
  const [recipeImage, setRecipeImage] = useState(null);
  const customOptionFields = recipe.customOptions.map((option, index) => (
    <div key={index}>
      <input
        type="text"
        value={option.customOptionName}
        onChange={(e) =>
          handleCustomOptionChange(index, "customOptionName", e.target.value)
        }
        placeholder="Custom Option Name"
      />
      <input
        type="text"
        value={option.quantity}
        onChange={(e) =>
          handleCustomOptionChange(index, "quantity", e.target.value)
        }
        placeholder="Quantity"
      />
      <button type="button" onClick={() => removeCustomOption(index)}>
        Remove Option
      </button>
    </div>
  ));

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/recipes/${recipeId}`
        );
        console.log("Fetched data:", response.data); // 로그 추가
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      }
    };

    const fetchfranchiseCafeList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/option/franchises"
        );
        const activeFranchises = response.data.filter(
          (franchise) => franchise.processing // 활성화 되어있는 프랜차이즈만 가져오기
        );
        setfranchiseCafeList(activeFranchises);
      } catch (error) {
        console.error("프랜차이즈 정보를 가져오는데 실패했습니다:", error);
      }
    };

    fetchfranchiseCafeList();
    fetchRecipeData();
  }, [recipeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleImageChange = (e) => {
    setRecipeImage(e.target.files[0]);
  };

  const handleBaseBeverageChange = (e) => {
    const { name, value } = e.target;
    setRecipe({
      ...recipe,
      baseBeverageVO: { ...recipe.baseBeverageVO, [name]: value },
    });
  };

  const handleFranchiseChange = (selectedOption) => {
    setSelectedFranchise(selectedOption);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("recipeImage", recipeImage);
    formData.append(
      "recipeDto",
      new Blob([JSON.stringify(recipe)], { type: "application/json" })
    );

    try {
      await axios.put(`http://localhost:8080/recipes/${recipeId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Saving recipe:", recipe);
      alert("레시피가 수정되었습니다.");
      navigate(`/recipes/${recipeId}`);
    } catch (error) {
      console.log("Saving recipe:", recipe);
      console.error("Error updating recipe:", error);
    }
  };

  const handleCustomOptionChange = (index, field, value) => {
    const updatedOptions = recipe.customOptions.map((option, i) => {
      if (i === index) {
        return { ...option, [field]: value };
      }
      return option;
    });
    setRecipe({ ...recipe, customOptions: updatedOptions });
  };

  const addCustomOption = () => {
    setRecipe({
      ...recipe,
      customOptions: [
        ...recipe.customOptions,
        { customOptionName: "", quantity: "" },
      ],
    });
  };

  const removeCustomOption = (index) => {
    setRecipe({
      ...recipe,
      customOptions: recipe.customOptions.filter((_, i) => i !== index),
    });
  };

  const handleCancel = () => {
    navigate(`/recipes/${recipeId}`);
  };

  return (
    <div>
      <h1>Edit Recipe</h1>
      <input
        type="text"
        name="recipeName"
        value={recipe.recipeName}
        onChange={handleInputChange}
        placeholder="Recipe Name"
      />
      <input type="file" onChange={handleImageChange} />
      <Select
        value={selectedFranchise}
        onChange={handleFranchiseChange}
        options={franchiseCafeList.map((franchise) => ({
          value: franchise.franchiseId,
          label: franchise.franchiseName,
        }))}
        className="react-select-container"
        classNamePrefix="react-select"
        placeholder="프랜차이즈 선택..."
        isClearable
        isSearchable
      />
      <input
        type="text"
        name="name"
        value={recipe.baseBeverageVO.name}
        onChange={handleBaseBeverageChange}
        placeholder="Base Beverage Name"
      />
      <input
        type="text"
        name="size"
        value={recipe.baseBeverageVO.size}
        onChange={handleBaseBeverageChange}
        placeholder="Base Beverage Size"
      />
      <input
        type="text"
        name="temperature"
        value={recipe.baseBeverageVO.temperature}
        onChange={handleBaseBeverageChange}
        placeholder="Base Beverage Temperature"
      />
      <textarea
        value={recipe.description}
        onChange={handleInputChange}
        name="description"
        placeholder="Recipe Description"
      />
      {customOptionFields}
      <button type="button" onClick={addCustomOption}>
        Add Custom Option
      </button>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}

export default EditRecipePage;
