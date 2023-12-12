import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import "./AddRecipePage.css";

function AddRecipePage() {
  // 상태 관리
  const [recipeName, setRecipeName] = useState("");
  const [description, setDescription] = useState("");
  const [baseBeverage, setBaseBeverage] = useState("");
  const [beverageSize, setBeverageSize] = useState("");
  const [beverageTemperature, setBeverageTemperature] = useState("");
  const [recipeImage, setRecipeImage] = useState(null);
  const [franchiseCafeList, setfranchiseCafeList] = useState([]);
  const [selectedFranchise, setSelectedFranchise] = useState(null);

  const [customOptions, setCustomOptions] = useState([
    {
      ingredientName: "",
      quantity: "",
      ingredientUnit: "",
    },
  ]);
  const [ingredientsList, setIngredientsList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // 프랜차이즈 정보를 가져오는 함수
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

    // 기본 재료 정보를 불러오는 함수
    const fetchIngredientsList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/option/ingredients"
        );
        setIngredientsList(response.data);
      } catch (error) {
        console.error("기본 재료 정보를 가져오는데 실패했습니다:", error);
      }
    };

    fetchfranchiseCafeList();
    fetchIngredientsList();
  }, []);

  const handleCustomOptionChange = (index, selectedOption) => {
    const newCustomOptions = [...customOptions];
    newCustomOptions[index].ingredientName = selectedOption
      ? selectedOption.value
      : "";
    setCustomOptions(newCustomOptions);
  };

  const handleAddCustomOption = () => {
    setCustomOptions([
      ...customOptions,
      { ingredientName: "", quantity: "", ingredientUnit: "" },
    ]);
  };

  const handleRemoveCustomOption = (index) => {
    const newCustomOptions = [...customOptions];
    newCustomOptions.splice(index, 1);
    setCustomOptions(newCustomOptions);
  };

  const handleFranchiseChange = (selectedOption) => {
    setSelectedFranchise(selectedOption);
  };

  const handleImageChange = (e) => {
    setRecipeImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recipeDto = {
      recipeName,
      description,
      franchiseId: selectedFranchise ? selectedFranchise.value : null,
      baseBeverageVO: {
        name: baseBeverage,
        size: beverageSize,
        temperature: beverageTemperature,
      },
      authorId: 4, // 이 부분은 사용자 인증에 따라 변경 필요
      customOptions: customOptions.map((option) => ({
        customOptionId: ingredientsList.find(
          (ingredient) => ingredient.ingredientName === option.ingredientName
        )?.customOptionId,
        quantity: option.quantity,
      })),
    };

    const formData = new FormData();
    formData.append("recipeImage", recipeImage);
    formData.append(
      "recipeDto",
      new Blob([JSON.stringify(recipeDto)], { type: "application/json" })
    );

    try {
      const response = await axios.post(
        "http://localhost:8080/recipes",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      alert("레시피가 등록되었습니다!"); // 성공 알림
      navigate("/recipes"); // 레시피 전체 보기 페이지로 리디렉션
    } catch (error) {
      console.error("레시피 등록 실패", error);
      alert("레시피 등록에 실패하였습니다."); // 실패 알림
      navigate("/recipes"); // 레시피 전체 보기 페이지로 리디렉션
    }
  };

  const handleCancel = () => {
    navigate("/recipes"); // 레시피 전체 보기 페이지로 리디렉션
  };

  return (
    <div className="add-recipe-page">
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleImageChange} accept="image/*" />
        <input
          type="text"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          placeholder="레시피 이름"
        />
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
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="메뉴 설명"
        />
        <input
          type="text"
          value={baseBeverage}
          onChange={(e) => setBaseBeverage(e.target.value)}
          placeholder="베이스 음료 이름"
        />
        <input
          type="text"
          value={beverageSize}
          onChange={(e) => setBeverageSize(e.target.value)}
          placeholder="베이스 음료 사이즈"
        />
        <select
          value={beverageTemperature}
          onChange={(e) => setBeverageTemperature(e.target.value)}
        >
          <option value="HOT">HOT</option>
          <option value="ICE">ICE</option>
        </select>

        {/* 커스텀 옵션 추가하는 부분 */}
        {customOptions.map((option, index) => (
          <div key={index} className="custom-option">
            <Select
              name="ingredientName"
              value={ingredientsList.find(
                (ingredient) =>
                  ingredient.ingredientName === option.ingredientName
              )}
              onChange={(selectedOption) =>
                handleCustomOptionChange(index, selectedOption)
              }
              options={ingredientsList.map((ingredient) => ({
                value: ingredient.ingredientName,
                label: ingredient.ingredientName,
              }))}
              placeholder="재료 선택..."
              isSearchable
            />
            <input
              name="quantity"
              type="text"
              value={option.quantity}
              onChange={(e) => handleCustomOptionChange(index, e)}
              placeholder="수량"
            />
            <button
              type="button"
              onClick={() => handleRemoveCustomOption(index)}
            >
              삭제
            </button>
          </div>
        ))}
        <button type="button" onClick={handleAddCustomOption}>
          옵션 추가하기
        </button>

        <button type="submit">등록하기</button>
        <button type="button" onClick={handleCancel}>
          취소하기
        </button>
      </form>
    </div>
  );
}

export default AddRecipePage;
